import React, { useEffect, useState } from 'react';
import DateMover from './components/containers/DateMover.component';
import CalendarMonth from './components/containers/CalendarMonth.component';
import Papa from "papaparse";

interface Transaction {
  Title: string;
  Type: string;
  Amount: string;
  Date: string;
}

export default function App() {
  const [startDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch("/data/transactions.csv");
      const csvText = await response.text();

      const parsedData = Papa.parse<Transaction>(csvText, { header: true, skipEmptyLines: true }).data;
      setTransactions(parsedData);
      // console.log(parsedData);
    };

    fetchTransactions();
  }, []);

  return (
    <div
      className="App"
      style={
        {
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }
      }
    >
      {/* <h1>Hello World!</h1> */}
      {/* <h2>startDate: {startDate.toString()}</h2> */}
      {/* <h2>selectedDate: {selectedDate.toString()}</h2> */}
      {/* Pass selectedDate and setter function to DateMover */}
      <DateMover selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <CalendarMonth selectedDate={selectedDate} transactions={transactions}/>
    </div>
  );
}
