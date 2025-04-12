import React, { useState, useEffect } from 'react';
import DateCard from './DateCard.component';

import { Transaction } from '../../types';

interface CalendarMonthProps {
  selectedDate: Date;
  transactions: Array<Transaction>;
}

interface DateObject {
  date: Date;
  isCurrentMonth: boolean;
  transactions: Array<Transaction>;
}

// Function to get the month name
const getMonthName = (monthIndex: number) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
};

const CalendarMonth: React.FC<CalendarMonthProps> = ({ selectedDate, transactions }) => {
  // Get the first and last date of the month
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

  // Get the previous month's trailing dates
  const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
  const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
  const prevMonthTrailingDates = Array.from({ length: firstDayOfMonth.getDay() }, (_, i) => {
    const dateNum = prevMonthLastDate.getDate() - (firstDayOfMonth.getDay() - i - 1);
    const fullDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), dateNum);
    return {
      date: fullDate,
      isCurrentMonth: false,
      transactions: transactions.filter(t => {
        let transactionDate = new Date(t.date);
        let result = transactionDate.toDateString() === fullDate.toDateString();
        return result;
      })
    };
  });

  // Get the current month's dates
  const currentMonthDates = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => {
    const fullDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1);

    return {
      date: fullDate,
      isCurrentMonth: true,
      transactions: transactions.filter(t => new Date(t.date).toDateString() === fullDate.toDateString())
    }
  });

  // Get the next month's leading dates
  const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
  const nextMonthLeadingDates = Array.from({ length: 42 - (prevMonthTrailingDates.length + currentMonthDates.length) }, (_, i) => {
    const fullDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1);

    return {
      date: fullDate,
      isCurrentMonth: false,
      transactions: transactions.filter(t => new Date(t.date).toDateString() === fullDate.toDateString())
    }
  });

  const allDates: DateObject[] = [...prevMonthTrailingDates, ...currentMonthDates, ...nextMonthLeadingDates];

  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // now I want a formula that gets runningTotalBeforeMonth, which calculates ALL transactions before the earliest date in the month
  // that value is then passed to the DateCard property, which adds the dateTotal to runningTotalBeforeMonth, 

  
  const [runningTotalBeforeCalendarMonth, setRunningTotalBeforeCalendarMonth] = useState(0);
  const [runningTotalArray, setRunningTotalArray] = useState<number[]>([]); // Holds cumulative totals for each date
  
  useEffect(() => {
    if (transactions.length === 0 || allDates.length === 0) return; // Avoid running on empty data
  
    // Calculate total before the calendar month
    const amount = transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.date);
      
      if (transactionDate < allDates[0].date) {    
        return total + (transaction.type.toLowerCase() === "expense" 
          ? -transaction.amount
          : transaction.amount);
      }
      
      return total;
    }, 0);
  
    setRunningTotalBeforeCalendarMonth(amount);
  }, [transactions, allDates]); 
  
  // useEffect(() => {
  //   // Calculate running total for each date
  //   const runningTotals = allDates.reduce((acc, date, index) => {
  //     const dateTotal = transactions
  //       .filter(transaction => new Date(transaction.Date).toDateString() === date.date.toDateString())
  //       .reduce((total, transaction) => {
  //         const amount = parseFloat(transaction.Amount);
  //         return transaction.Type.toLowerCase() === "expense" ? total - amount : total + amount;
  //       }, 0);
      
  //     // Get last total or start with runningTotalBeforeCalendarMonth
  //     const lastTotal = acc.length > 0 ? acc[acc.length - 1] : runningTotalBeforeCalendarMonth;
  //     acc.push(lastTotal + dateTotal);
  //     return acc;
  //   }, []);
  
  //   setRunningTotalArray(runningTotals);
  // }, [transactions, allDates, runningTotalBeforeCalendarMonth]); // Ensure recalculation when dependencies change
  

  return (
    <div>
      {/* <h2>{getMonthName(selectedDate.getMonth())} {selectedDate.getFullYear()}</h2> */}
      <div>
        <div style={{ display: 'flex' }}>
          {dayLabels.map(day => <div key={day} style={{ flex: 1, textAlign: 'center' }}>{day}</div>)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'stretch', alignContent: 'stretch'}}>
          {allDates.map((dateObj, index) => (
            // <div key={index} style={{ width: '14%', textAlign: 'center' }}>
              <DateCard 
                date={dateObj.date} 
                isCurrentMonth={dateObj.isCurrentMonth} 
                selectedDate={selectedDate} 
                transactions={dateObj.transactions}
                key={index}
                // runningTotal={runningTotal}
                // setRunningTotal={setRunningTotal}
              />
            // </div>
          ))}
          {/* {allDates.map((date, index) => (
            <DateCard 
              key={date.date.toISOString()} 
              date={date.date} 
              isCurrentMonth={date.isCurrentMonth} 
              transactions={transactions}
              selectedDate={selectedDate} 
              runningTotal={runningTotalArray[index] || 0} // Pass precomputed running total
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default CalendarMonth;
