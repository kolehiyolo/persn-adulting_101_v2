// * Dependencies
import React, { useState, useEffect } from 'react';

// * Other Components
import DateCard from './DateCard.component';

// * Other Imports
import { Transaction } from '../../types';
import { CalendarHeadDataObj } from '../../types';
import { DateData } from '../../types';
import './CalendarMonth.component.scss';

// * Component Props
interface CalendarMonthProps {
  selectedDate: Date;
  transactions: Array<Transaction>;
  setCalendarChangeDataObj: React.Dispatch<React.SetStateAction<CalendarHeadDataObj>>,
}

// * Component
export default function CalendarMonth({
  selectedDate,
  transactions,
  setCalendarChangeDataObj
}: CalendarMonthProps) {
  // First, get all dates and put into calendarDates
  // Then, process each calendarDates and add to calendarDatesData
  const getCalendarDates = () => {
    // * Get the first and last date of the month
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    
    // * Trailing Dates
    const prevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
    const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
    const prevMonthTrailingDates = Array.from({ length: firstDayOfMonth.getDay() }, (_, i) => {
      const dateNum = prevMonthLastDate.getDate() - (firstDayOfMonth.getDay() - i - 1);
      const fullDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), dateNum);

      return fullDate;
    });

    // * Current Month Dates
    const currentMonthDates = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => {
      const fullDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1);
      return fullDate;
    });

    // * Leading Dates
    const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
    const nextMonthLeadingDates = Array.from({ length: 42 - (prevMonthTrailingDates.length + currentMonthDates.length) }, (_, i) => {
      const fullDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1);

      return fullDate;
    });

    // * Merging all dates
    const result: Date[] = [...prevMonthTrailingDates, ...currentMonthDates, ...nextMonthLeadingDates];

    return result;
  };

  const getCalendarDatesData = (calendarDates: Date[], transactions: Transaction[]) => {
    const result = calendarDates.map((date) => {
      const dateTransactions = transactions
        .filter(transaction => 
          new Date(transaction.date).toDateString() === date.toDateString()
        );

      const dateTotal = dateTransactions
        .reduce((total, transaction) => {
          return transaction.type.toLowerCase() === "expense"
            ? total - transaction.amount
            : total + transaction.amount;
        }
      , 0);

      const dateTotalRunning = transactions
        .filter(transaction => 
          new Date(transaction.date) < date
        )
        .reduce((total, transaction) => {
          return transaction.type.toLowerCase() === "expense"
            ? total - transaction.amount
            : total + transaction.amount;
        }
      , 0) + dateTotal;

      return {
        date: date,
        isCurrentMonth: selectedDate.getMonth() === date.getMonth(),
        transactions: dateTransactions,
        total: dateTotal,
        totalRunning: dateTotalRunning
      };
    })

    return result;
  };

  const calendarDates: Date[] = getCalendarDates();
  const calendarDatesData: DateData[] = getCalendarDatesData(calendarDates, transactions);

  // * Change thing
  useEffect(()=>{
    const currentMonthData = calendarDatesData
      .filter(dateData => 
        new Date(dateData.date).getMonth() === selectedDate.getMonth()
      );
    const totalRunning = currentMonthData[currentMonthData.length - 1].totalRunning;
    const change = currentMonthData
      .reduce((totalMonthChange, dateData) => {
        return totalMonthChange + dateData.total;
      }
    , 0);
    const max = Math.max(...currentMonthData.map(item => item.totalRunning));
    const min = Math.min(...currentMonthData.map(item => item.totalRunning));

    console.log(calendarDatesData);

    setCalendarChangeDataObj(
      {
        totalRunning: totalRunning,
        change: change,
        max: max,
        min: min
      }
    );
  }, [calendarDatesData]);
  
  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // * Rendering
  return (
    <div
      className='calendarMonth'
    >
      <div 
        className='head'
      >
        {
          dayLabels.map(day => 
            <div
              className='dayLabel'
              key={day}
            >
              {day}
            </div>
          )
        }
      </div>
      <div 
        className='body'
      >
        {
          Array.from({ length: 6 }, (_, rowIndex) => {
            const start = rowIndex * 7;
            const end = start + 7;
            const rowDates = calendarDatesData.slice(start, end);

            return (
              <div className="row" key={rowIndex}>
                {
                  rowDates.map((dateData, index) => (
                    <DateCard 
                      dateData={dateData}
                      selectedDate={selectedDate} 
                      key={index}
                    />
                  ))
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
};