// * Dependencies
import React, { useEffect, useState } from 'react';
import Papa from "papaparse";

// * Other Components
import DateMover from './components/containers/DateMover.component';
import CalendarMonth from './components/containers/CalendarMonth.component';
import CalendarHeadData from './components/containers/CalendarHeadData.component';

// * Other Imports
import { Transaction } from './types';
import { CalendarHeadDataObj } from './types';
import './styles/App.scss';

// * Component
export default function App() {
  // * States
  const [startDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [calendarView, setCalendarView] = useState('month');
  const [dataSet, setDataSet] = useState(`0003-kren`);

  const[calendarHeadDataObj, setCalendarChangeDataObj] = useState<CalendarHeadDataObj>({
    totalRunning: 3056.15,
    change: 1158.76,
    max: 51864.92,
    min: 458.76,
  });

  // * Fetching transactions from CSV
  useEffect(() => {
    const fetchTransactions = async () => {
      // * Step 1: Fetch the CSV file from the public folder
      const response = await fetch(`/data/sets/${dataSet}/output/transactions-all.csv`);

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
        date: row.date,                         // Leave the date as-is (should already be in standardized format)
      }));

      // * Step 5: Set the transformed data into state
      setTransactions(parsedData);
    };

    // * Execute the fetch logic once on component mount
    fetchTransactions();
  }, []);

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
            {
              calendarView === 'month' ?
              <CalendarHeadData
                calendarTotalRunning={calendarHeadDataObj.totalRunning}
                calendarChange={calendarHeadDataObj.change}
                calendarMax={calendarHeadDataObj.max}
                calendarMin={calendarHeadDataObj.min}
              />
              : <></>
            }
          </div>
          <div
            className='right'
          >

          </div>
        </div>
        <div
          className='body'
        >
          <CalendarMonth
            selectedDate={selectedDate}
            transactions={transactions}
            setCalendarChangeDataObj={setCalendarChangeDataObj}
          />
        </div>
      </main>
    </div>
  );
}
