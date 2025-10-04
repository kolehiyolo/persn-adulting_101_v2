// * Dependencies
import React, { useEffect, useState } from 'react';
import Papa from "papaparse";

// * Other Components
import DateMover from './components/containers/DateMover.component';
import CalendarMonth from './components/containers/CalendarMonth.component';
import CalendarYear from './components/containers/CalendarYear.component';
import CalendarHeadData from './components/containers/CalendarHeadData.component';
import DataControls from './components/containers/DataControls.component';

// * Other Imports
import { Transaction } from './types';
import { CalDate } from './types';
import { CalHead } from './types';
import { User } from './types';
import './styles/App.scss';

// * Component
export default function App() {
  // # STATES
  // * Constant On Mount
  // Prefix = const
  const [constDateStart] = useState<Date>(() => new Date());
  const [constUsers, setConstUsers] = useState<User[]>([]);

  // * Variable by Processes
  // Prefix = prcsd
  const [prcsdCalDates, setPrcsdCalDates] = useState<CalDate[]>([]);
  const [prcsdCalHead, setPrcsdCalHead] = useState<CalHead>(
    {
      totalRunning: 0,
      change: 0,
      max: 0,
      min: 0,
    }
  );

  // * Variable by User
  // Prefix = active
  const [activeDate, setActiveDate] = useState<Date>(constDateStart);
  const [activeUser, setActiveUser] = useState<User>();
  const [activeView, setActiveView] = useState<string>('month');

  // # triggerOnMount
  // Trigger when App is mounted
  useEffect(() => {
    // * Fetch the meta data for the users from users.csv
    // After, activeUser is set
    // This should only be run once when App is mounted    
    const fetchConstUsers = async () => {
      // * Step 1: Fetch the CSV file from the public folder
      const response = await fetch(`/data/users.csv`);

      // * Step 2: Read the response as plain text
      const csvText = await response.text();

      // * Step 3: Parse the CSV text using PapaParse, treating the first row as headers
      const parsed = Papa.parse(csvText, {
        header: true,           // Treat the first row as column headers
        skipEmptyLines: true,   // Ignore empty lines in the CSV
      });

      // * Step 4: Transform parsed data into User[] first
      let users: User[] = parsed.data.map((row: any) => ({
        id: row.id,
        name: row.name,
        folder_name: row.folder_name,
        household_id: row.household_id,
        household_name: row.household_name,
        cal_date: [],
        transactions: [],
      }));

      // * Step 5: Fetch cal_dates for each user (async)
      const usersWithCalDates = await Promise.all(
        users.map(async (user: User) => {
          const calDates = await fetchCalDates(user.folder_name);
          return {
            ...user,
            cal_date: calDates,
          };
        })
      );

      // * Step 6: Fetch cal_dates for each user (async)
      const usersWithTransactions = await Promise.all(
        usersWithCalDates.map(async (user: User) => {
          const transactions = await fetchTransactions(user.folder_name);
          return {
            ...user,
            transactions: transactions,
          };
        })
      );

      // * Step 7: Store in state
      setConstUsers(usersWithTransactions);

      // * Picking active user
      setActiveUser(usersWithTransactions[0]);
    };

    const fetchCalDates = async (user: string) => {
      // * Step 1: Fetch the CSV file from the public folder
      const response = await fetch(`/data/users/${user}/output/calendar-dates-w-transactions.csv`);

      // * Step 2: Read the response as plain text
      const csvText = await response.text();

      // * Step 3: Parse the CSV text using PapaParse, treating the first row as headers
      const parsed = Papa.parse(csvText, {
        header: true,           // Treat the first row as column headers
        skipEmptyLines: true,   // Ignore empty lines in the CSV
      });

      // * Step 4: Transform parsed data into Transaction objects
      const parsedData = parsed.data.map((row: any) => ({
        calendar_month: new Date(row.calendar_month),
        date: new Date(row.date),
        date_is_not_trailing_or_leading: row.date_is_not_trailing_or_leading.toLowerCase() === "true",
        date_positive: parseFloat(row.date_positive),
        date_negative: parseFloat(row.date_negative),
        date_change: parseFloat(row.date_change),
        date_total_running: parseFloat(row.date_total_running),
        transactions: []
      }));

      // * Step 5: Set the transformed data into state
      return(parsedData);
    };

    const fetchTransactions = async (user: string) => {
      // * Step 1: Fetch the CSV file from the public folder
      const response = await fetch(`/data/users/${user}/output/transactions-all.csv`);

      // * Step 2: Read the response as plain text
      const csvText = await response.text();

      // * Step 3: Parse the CSV text using PapaParse, treating the first row as headers
      const parsed = Papa.parse(csvText, {
        header: true,           // Treat the first row as column headers
        skipEmptyLines: true,   // Ignore empty lines in the CSV
      });

      // * Step 4: Transform parsed data into Transaction objects
      const parsedData: Transaction[] = parsed.data.map((row: any) => ({
        title: row.title,
        type: row.type,
        tags: row.tags,
        category: row.category,
        amount: parseFloat(row.amount),
        date: new Date(row.date),
      }));

      // * Step 5: Set the transformed data into state
      return(parsedData);
    };

    console.log(`SUCCESS triggerOnMount`);
    console.log('triggerOnMount');
    fetchConstUsers();
  }, []);

  // # RENDERING
  return (
    <div
      className='App'
    >
      <main
        className='main'
      >
        <div
          className='head'
        >
          <div
            className='left'
          >
            <DateMover
              activeView={activeView}
              setActiveView={setActiveView}
              activeDate={activeDate}
              setActiveDate={setActiveDate}
            />
          </div>
          <div
            className='right'
          >
            {
                activeUser != undefined &&
                activeUser.transactions != undefined &&
                activeUser.cal_date != undefined
              ?                
                (
                  <DataControls
                    constUsers={constUsers}
                    activeUser={activeUser}
                    setActiveUser={setActiveUser}
                    calendarDatesData={activeUser.cal_date}
                    setActiveDate={setActiveDate}
                  />
                )
              : <></>
            }
            {
                activeUser != undefined &&
                activeUser.transactions != undefined &&
                activeUser.cal_date != undefined
              ?                
                (
                  // activeView === 'month' ?
                  <CalendarHeadData
                    calendarTotalRunning={prcsdCalHead.totalRunning}
                    calendarChange={prcsdCalHead.change}
                    calendarMax={prcsdCalHead.max}
                    calendarMin={prcsdCalHead.min}
                  />
                  // : <></>
                )
              : <></>
            }
          </div>
        </div>
        <div
          className='body'
        >
          {
              activeUser != undefined &&
              activeUser.transactions != undefined &&
              activeUser.cal_date != undefined
            ?
              (
                activeView === 'month' ?
                  <CalendarMonth
                    activeDate={activeDate}
                    activeUser={activeUser}
                    setPrcsdCalHead={setPrcsdCalHead}
                  />
                :
                activeView === 'year' ?
                  <CalendarYear
                    activeDate={activeDate}
                    activeUser={activeUser}
                    setPrcsdCalHead={setPrcsdCalHead}
                  />
                :
                  <></>
              )
            : <></>
          }
        </div>
      </main>
    </div>
  );
}
