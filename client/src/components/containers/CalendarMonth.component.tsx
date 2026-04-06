// * Dependencies
import React, { useState, useEffect } from 'react';

// * Other Components
import DateCard from './DateCard.component';

// * Other Imports
import { CalDate } from '../../types';
import { CalHead } from '../../types';
import { User } from '../../types';
import { Transaction } from '../../types';
import './CalendarMonth.component.scss';

// * Component Props
interface CalendarMonthProps {
  activeDate: Date;
  activeUser: User;
  setPrcsdCalHead: React.Dispatch<React.SetStateAction<CalHead>>;
}

// * Component
export default function CalendarMonth({
  activeDate,
  activeUser,
  setPrcsdCalHead
}: CalendarMonthProps) {
  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const [prcsdCalDates, setPrcsdCalDates] = useState<CalDate[]>([]);

  // # triggerOnUserChangingActiveDateOrActiveUser
  // Trigger if user changes activeDate or activeUser
  // This updates prcsdCalDates
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
      const prcsActiveDateCalendarDatesData = (
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

      console.log(`prcsActiveDateCalendarDatesData(activeDate, activeUser.cal_date, activeUser.transactions)`);
      console.log(activeDate);
      console.log(activeUser.cal_date);
      console.log(activeUser.transactions);

      prcsActiveDateCalendarDatesData(activeDate, activeUser.cal_date, activeUser.transactions);
    }
  }, [activeDate, activeUser]);

  // # triggerOnUpdateOfPrcsdCalendarDatesData
  // When triggerOnUserChangingActiveDateOrActiveUser happens, this is what should happen next
  // This updates prcsdCalHead
  useEffect(() => {
    // * We run this if the user changes the date OR changes the selected user
    // We calculate the data to show at the head of the calendar view mode
    if (prcsdCalDates[0] != undefined) {
      console.log(`triggerOnUpdateOfSelectedCalendarDatesDataOrActiveUser`);
      const prcsCalHead = (selectedCalendarDatesData: CalDate[]) => {
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
      prcsCalHead(prcsdCalDates);
    }
  }, [prcsdCalDates]);

  useEffect(() => {
    console.log(`prcsdCalDates updated: `);
    console.log(prcsdCalDates);
  }, [prcsdCalDates]);

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
            const rowDates = prcsdCalDates.slice(start, end);

            return (
              <div className="row" key={rowIndex}>
                {
                  rowDates.map((dateData, index) => (
                    <DateCard 
                      dateData={dateData}
                      activeDate={activeDate} 
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