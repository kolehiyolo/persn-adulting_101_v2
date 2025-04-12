import React, { useEffect, useState } from 'react';
import DateMover from './components/containers/DateMover.component';
import CalendarMonth from './components/containers/CalendarMonth.component';
import Papa from "papaparse";

import { Transaction } from './types';

export default function App() {
  const [startDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch("/data/generatedTransactions.csv");
      const csvText = await response.text();
  
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });
  
      const parsedData: Transaction[] = parsed.data.map((row: any) => ({
        title: row.title,
        type: row.type,
        category: row.category,
        amount: parseFloat(row.amount),
        date: row.date,
      }));
  
      setTransactions(parsedData);
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
      <DateMover selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <CalendarMonth selectedDate={selectedDate} transactions={transactions}/>
    </div>
  );
}
