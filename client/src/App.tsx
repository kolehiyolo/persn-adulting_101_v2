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
  const [constStartDate] = useState(() => new Date());
  const [constUsers, setConstUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [calendarDatesData, setCalendarDatesData] = useState<CalDate[]>([]);

  // * Variable by Processes
  // Prefix = prcsd
  const [selectedCalendarDatesData, setSelectedCalendarDatesData] = useState<CalDate[]>([]);
  const [prcsdCalHead, setPrcsdCalHead] =
    useState<CalHead>({
      totalRunning: 0,
      change: 0,
      max: 0,
      min: 0,
    });

  // * Variable by User
  // Prefix = active
  const [activeDate, setActiveDate] = useState(constStartDate);
  const [activeUser, setActiveUser] = useState('');
  const [activeView, setActiveView] = useState('month');

  const fetchconstUsers = async () => {
    // * Step 1: Fetch the CSV file from the public folder
    const response = await fetch(`/data/users.csv`);

    // * Step 2: Read the response as plain text
    const csvText = await response.text();

    // * Step 3: Parse the CSV text using PapaParse, treating the first row as headers
    const parsed = Papa.parse(csvText, {
      header: true,           // Treat the first row as column headers
      skipEmptyLines: true,   // Ignore empty lines in the CSV
    });

    // * Step 4: Transform parsed data into Transaction objects
    const parsedData: User[] = parsed.data.map((row: any) => ({
      id: row.id,
      name: row.name,
      folder_name: row.folder_name,
      household_id: row.household_id,
      household_name: row.household_name,
      transactions: [],
      dates: [],
    }));

    setConstUsers(parsedData)
    console.log(`constUsers is ready`);

    const activeUserName = parsedData[0].folder_name;


    setActiveUser(activeUserName);
  }

  const fetchCalendarDatesData = async () => {
    // * Step 1: Fetch the CSV file from the public folder
    const response = await fetch(`/data/users/${activeUser}/output/calendar-dates-w-transactions.csv`);

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

    console.log(parsedData);

    // * Step 5: Set the transformed data into state
    setCalendarDatesData(parsedData);
  };

  const fetchTransactions = async () => {
    // * Step 1: Fetch the CSV file from the public folder
    const response = await fetch(`/data/users/${activeUser}/output/transactions-all.csv`);

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
    setTransactions(parsedData);
  };

  const fetchactiveDateCalendarDatesData = (
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
      setSelectedCalendarDatesData([]);
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
    console.log(result);
    setSelectedCalendarDatesData(result);

    const currentMonthData = result
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

    console.log(newCalendarChangeDataObj);

    setPrcsdCalHead(newCalendarChangeDataObj);
  }; 

  // # ON MOUNT CHAIN
  useEffect(() => {
    // * Fetch the meta data for the sets from sets.csv
    // After, activeUser is set
    // This should only be run once when App is mounted
    console.log('fetchconstUsers()');
    fetchconstUsers();
  }, []);

  useEffect(() => {
    // * When activeUser is set, fetch the transactions and calendarDatesData
    if (activeUser != '') {
      console.log(`run if constUsers is ready`);
      fetchTransactions();
      fetchCalendarDatesData();
    }
  }, [activeUser]);

  useEffect(() => {
    // * We run this based on the ff conditions:
      // * When transactions & calendarDatesData have been fetched due to activeUser changing
      // * When activeDate is changed
    // We calculate the data for the selected date based on the transactions and the dates
    if (transactions[0] !=undefined && calendarDatesData[0] !=undefined) {
      console.log(`run if transactions & calendarDatesData are ready`);
      fetchactiveDateCalendarDatesData(activeDate, calendarDatesData, transactions);
    }
  }, [activeDate, transactions, calendarDatesData]);

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
            <DataControls
              constUsers={constUsers}
              activeUser={activeUser}
              setActiveUser={setActiveUser}
              calendarDatesData={calendarDatesData}
              setActiveDate={setActiveDate}
            />
          </div>
          <div
            className='right'
          >
            {
              transactions[0] != undefined ?
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
            transactions[0] != undefined ?
              (
                activeView === 'month' ?
                  <CalendarMonth
                    activeDate={activeDate}
                    selectedCalendarDatesData={selectedCalendarDatesData}
                  />
                :
                activeView === 'year' ?
                  <CalendarYear
                    activeDate={activeDate}
                    selectedCalendarDatesData={selectedCalendarDatesData}
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
