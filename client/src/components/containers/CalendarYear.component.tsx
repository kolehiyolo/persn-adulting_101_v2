// * Dependencies
import React, { useState, useEffect } from 'react';

// * Other Components
import CalendarMonthYearly from './CalendarMonthYearly.component';

// * Other Imports
import { CalDate } from '../../types';
import { CalHead } from '../../types';
import { User } from '../../types';
import { Transaction } from '../../types';
import './CalendarYear.component.scss';

// * Component Props
interface CalendarYearProps {
  activeDate: Date;
  activeUser: User;
  setPrcsdCalHead: React.Dispatch<React.SetStateAction<CalHead>>;
}

// * Component
export default function CalendarYear ({
  activeDate,
  activeUser,
  setPrcsdCalHead
}: CalendarYearProps) {
  const [prcsdCalDates, setPrcsdCalDates] = useState<CalDate[]>([]);
  const [prcsdCalMonths, setPrcsdCalMonths] = useState<CalDate[][]>([]);

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
          item.calendar_month.getFullYear() === activeDate.getFullYear()
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
        console.log(result.length);
        setPrcsdCalDates(result);
      }; 

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
        const currentYearData = selectedCalendarDatesData
          .filter(dateData => 
            new Date(dateData.date).getFullYear() === activeDate.getFullYear()
          );

        const totalRunning = currentYearData[currentYearData.length - 1].date_total_running;
        const change = currentYearData
          .reduce((totalYearChange, dateData) => {
            return totalYearChange + dateData.date_change;
          }
        , 0);
        const max = Math.max(...currentYearData.map(item => item.date_total_running));
        const min = Math.min(...currentYearData.map(item => item.date_total_running));

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
    const prcsActiveDateCalendarDatesData = (
      activeDate: Date,
      prcsdCalDates: CalDate[],
    ) => {
      let result = [];

      // Loop through each month of the year
      for (let month = 0; month < 12; month++) {
        // 1. Get first date in the activeDate's year
        const monthFirstDate = new Date(activeDate.getFullYear(), month, 1);

        const filteredDates = prcsdCalDates.filter(item => 
          item.calendar_month.getFullYear() === monthFirstDate.getFullYear() &&
          item.calendar_month.getMonth() === monthFirstDate.getMonth()
        );

        if (filteredDates.length === 0) {
          setPrcsdCalMonths([]);
          return;
        };

        result.push(filteredDates);
      }

      setPrcsdCalMonths(result);
    };

    prcsActiveDateCalendarDatesData(activeDate, prcsdCalDates);
  }, [prcsdCalDates]);

  // * Rendering
  return (
    <div
      className='calendarYear'
    >
      {/* Loop through prcsdCalMonths */}
      {/* Render CalendarMonthYearly for each */}
      {/* Pass on each prcsdCalMonths item as prop to the component */}
      {
        prcsdCalMonths.map((prcsdCalMonth, index) =>
          <CalendarMonthYearly
            key={index}
            activeDate={activeDate}
            prcsdCalDates={prcsdCalMonth}
          />
        )
      }
    </div>
  );
};