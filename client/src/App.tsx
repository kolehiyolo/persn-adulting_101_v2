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

  // # triggerOnUserChangingActiveDateOrActiveUser
  // Trigger if user changes activeDate or activeUser
  useEffect(() => {
    // * We run this based on the ff conditions:
      // * When transactions & calendarDatesData have been fetched due to activeUser changing
      // * When activeDate is changed
    // We calculate the data for the selected date based on the transactions and the dates
    if (
      activeUser != undefined &&
      activeUser.transactions != undefined &&
      activeUser.cal_date != undefined
    ) {
      console.log(`triggerOnUserChangingActiveDateOrActiveUser`);
      const fetchActiveDateCalendarDatesData = (
        activeDate: Date,
        calendarDatesData: CalDate[],
        transactions: Transaction[]
      ) => {
        // 1. Filter by selected calendar month
        const filteredDates = calendarDatesData.filter(item => 
          item.calendar_month.getFullYear() === activeDate.getFullYear() &&
          item.calendar_month.getMonth() === activeDate.getMonth()
        );
      
        if (filteredDates.length === 0) {
          setPrcsdCalDates([]);
          return;
        };
      
        // 2. Get first and last date in the filtered calendar dates
        const firstDate = new Date(
          Math.min(...filteredDates.map(d => d.date.getTime()))
        ).toISOString().split('T')[0];
        const lastDate = new Date(
          Math.max(...filteredDates.map(d => d.date.getTime()))
        ).toISOString().split('T')[0];
      
        // 3. Filter transactions that fall within the date range
        const filteredTransactions = transactions.filter((txn) =>
          {
            const txnDateOnly = txn.date.toISOString().split('T')[0];
            return txnDateOnly >= firstDate && txnDateOnly <= lastDate
          }
        );
      
        // 4. Attach transactions to each date 
        const result = filteredDates.map(dateItem => {
          const dateOnly = dateItem.date.toISOString().split('T')[0];
      
          const matchingTransactions = filteredTransactions.filter((txn) => {
            return txn.date.toISOString().split('T')[0] === dateOnly;
          }
          );
      
          return {
            ...dateItem,
            transactions: matchingTransactions
          };
        });
      
        // 5. Set result
        console.log(`SUCCESS triggerOnUserChangingActiveDateOrActiveUser`);
        setPrcsdCalDates(result);
      }; 

      fetchActiveDateCalendarDatesData(activeDate, activeUser.cal_date, activeUser.transactions);
    }
  }, [activeDate, activeUser]);

  // # triggerOnUpdateOfPrcsdCalendarDatesData
  // When triggerOnUserChangingActiveDateOrActiveUser happens, this is what should happen next
  useEffect(() => {
    // * We run this if the user changes the date OR changes the selected user
    // We calculate the data to show at the head of the calendar view mode
    if (prcsdCalDates[0] != undefined) {
      console.log(`triggerOnUpdateOfSelectedCalendarDatesDataOrActiveUser`);
      const fetchCalHead = (selectedCalendarDatesData: CalDate[]) => {
        const currentMonthData = selectedCalendarDatesData
          .filter(dateData => 
            new Date(dateData.date).getMonth() === activeDate.getMonth()
          );

        const totalRunning = currentMonthData[currentMonthData.length - 1].date_total_running;
        const change = currentMonthData
          .reduce((totalMonthChange, dateData) => {
            return totalMonthChange + dateData.date_change;
          }
        , 0);
        const max = Math.max(...currentMonthData.map(item => item.date_total_running));
        const min = Math.min(...currentMonthData.map(item => item.date_total_running));

        const newCalendarChangeDataObj = {
          totalRunning: totalRunning,
          change: change,
          max: max,
          min: min
        }

        setPrcsdCalHead(newCalendarChangeDataObj);
        console.log(`SUCCESS triggerOnUpdateOfSelectedCalendarDatesDataOrActiveUser`);
      };
      fetchCalHead(prcsdCalDates);
    }
  }, [prcsdCalDates]);

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
                  activeView === 'month' ?
                  <CalendarHeadData
                    calendarTotalRunning={prcsdCalHead.totalRunning}
                    calendarChange={prcsdCalHead.change}
                    calendarMax={prcsdCalHead.max}
                    calendarMin={prcsdCalHead.min}
                  />
                  : <></>
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
                    selectedCalendarDatesData={prcsdCalDates}
                  />
                :
                activeView === 'year' ?
                  <CalendarYear
                    activeDate={activeDate}
                    selectedCalendarDatesData={prcsdCalDates}
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
