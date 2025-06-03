// * Dependencies
import React, { useEffect, useState } from 'react';
import Papa from "papaparse";

// * Other Components
import DateMover from './components/containers/DateMover.component';
import CalendarMonth from './components/containers/CalendarMonth.component';
import CalendarHeadData from './components/containers/CalendarHeadData.component';
import DataControls from './components/containers/DataControls.component';

// * Other Imports
import { Transaction } from './types';
import { CalendarDateData } from './types';
import { CalendarHeadDataObj } from './types';
import { DataSet } from './types';
import './styles/App.scss';

// * Component
export default function App() {
  // * States
  const [startDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [calendarView, setCalendarView] = useState('month');
  const [calendarDatesData, setCalendarDatesData] = useState<CalendarDateData[]>([]);
  const [selectedCalendarDatesData, setSelectedCalendarDatesData] = useState<CalendarDateData[]>([]);
  const [selectedDataSet, setSelectedDataSet] = useState('');
  const [dataSets, setDataSets] = useState<DataSet[]>([]);
  const[calendarHeadDataObj, setCalendarChangeDataObj] = useState<CalendarHeadDataObj>({
    totalRunning: 0,
    change: 0,
    max: 0,
    min: 0,
  });

  const fetchDataSets = async () => {
    // * Step 1: Fetch the CSV file from the public folder
    const response = await fetch(`/data/sets.csv`);

    // * Step 2: Read the response as plain text
    const csvText = await response.text();

    // * Step 3: Parse the CSV text using PapaParse, treating the first row as headers
    const parsed = Papa.parse(csvText, {
      header: true,           // Treat the first row as column headers
      skipEmptyLines: true,   // Ignore empty lines in the CSV
    });

    // * Step 4: Transform parsed data into Transaction objects
    const parsedData: DataSet[] = parsed.data.map((row: any) => ({
      id: row.id,
      name: row.name,
      household_id: row.household_id,
      household_name: row.household_name,
    }));

    setDataSets(parsedData)

    const selectedDataSetName = (`${parsedData[0].id}-${parsedData[0].name.replace(/\s+/g, "_") }`)

    console.log(`dataSets is ready`);

    setSelectedDataSet(selectedDataSetName);
  }

  const fetchTransactions = async () => {
    // * Step 1: Fetch the CSV file from the public folder
    const response = await fetch(`/data/sets/${selectedDataSet}/output/transactions-all.csv`);

    // * Step 2: Read the response as plain text
    const csvText = await response.text();

    // * Step 3: Parse the CSV text using PapaParse, treating the first row as headers
    const parsed = Papa.parse(csvText, {
      header: true,           // Treat the first row as column headers
      skipEmptyLines: true,   // Ignore empty lines in the CSV
    });

    // * Step 4: Transform parsed data into Transaction objects
    const parsedData: Transaction[] = parsed.data.map((row: any) => ({
      title: row.title,                       // Get the transaction title
      type: row.type,                         // Get the transaction type (Expense or Income)
      tags: row.tags,
      category: row.category,                 // Get the category
      amount: parseFloat(row.amount),         // Parse the amount string into a number
      date: new Date(row.date),                         // Leave the date as-is (should already be in standardized format)
    }));

    // * Step 5: Set the transformed data into state
    setTransactions(parsedData);
  };

  const fetchCalendarDatesData = async () => {
    // * Step 1: Fetch the CSV file from the public folder
    const response = await fetch(`/data/sets/${selectedDataSet}/output/calendar-dates-w-transactions.csv`);

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

  const fetchSelectedDateCalendarDatesData = (
    selectedDate: Date,
    calendarDatesData: CalendarDateData[],
    transactions: Transaction[]
  ) => {
    // 1. Filter by selected calendar month
    const filteredDates = calendarDatesData.filter(item => 
      item.calendar_month.getFullYear() === selectedDate.getFullYear() &&
      item.calendar_month.getMonth() === selectedDate.getMonth()
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
        new Date(dateData.date).getMonth() === selectedDate.getMonth()
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

    setCalendarChangeDataObj(newCalendarChangeDataObj);
  };  

  // * Fetching transactions from CSV
  useEffect(() => {
    // * Execute the fetch logic once on component mount
    fetchDataSets();
  }, []);

  // * Fetching transactions from CSV
  useEffect(() => {
    // * Execute the fetch logic once on component mount
    console.log(`run if dataSets is ready`);
    if (dataSets[0] !=undefined) {
      fetchTransactions();
      fetchCalendarDatesData();
      fetchSelectedDateCalendarDatesData(selectedDate, calendarDatesData, transactions);
    }
  }, [dataSets, selectedDataSet]);

  useEffect(() => {
    fetchSelectedDateCalendarDatesData(selectedDate, calendarDatesData, transactions)
  }, [selectedDate, calendarDatesData, transactions]);

  const handleClickGenerateData = async () => {
    console.log(`Trigger handleClickGenerateData()`);
    fetchTransactions();
    fetchCalendarDatesData();
  };

  const handleTotalSearch = (inputTotalSearch: number) => {
    console.log(`Trigger handleTotalSearch(${inputTotalSearch})`);
  
    const matching = calendarDatesData
      .filter(item => item.date_total_running > inputTotalSearch)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  
    const earliestMatch = matching[0];
  
    if (earliestMatch) {
      console.log("Earliest match:", earliestMatch);
      setSelectedDate(earliestMatch.date);
      // Optionally do something else with earliestMatch
    } else {
      console.log("No match found with date_total_running > inputTotalSearch");
    }
  };

  // * Rendering
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
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <DataControls
              handleClickGenerateData={handleClickGenerateData}
              dataSets={dataSets}
              setSelectedDataSet={setSelectedDataSet}
              handleTotalSearch={handleTotalSearch}
            />
          </div>
          <div
            className='right'
          >
            {
              transactions[0] != undefined ?
                (
                  calendarView === 'month' ?
                  <CalendarHeadData
                    calendarTotalRunning={calendarHeadDataObj.totalRunning}
                    calendarChange={calendarHeadDataObj.change}
                    calendarMax={calendarHeadDataObj.max}
                    calendarMin={calendarHeadDataObj.min}
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
                <CalendarMonth
                selectedDate={selectedDate}
                selectedCalendarDatesData={selectedCalendarDatesData}
              />
              )
            : <></>
          }
        </div>
      </main>
    </div>
  );
}
