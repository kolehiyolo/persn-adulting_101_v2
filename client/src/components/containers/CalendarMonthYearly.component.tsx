// * Dependencies
import React, { useState, useEffect } from 'react';

// * Other Components
import DateCardYearly from './DateCardYearly.component';
import CalendarMonthYearlyHead from './CalendarMonthYearlyHead.component';

// * Other Imports
import { CalDate } from '../../types';
import { CalHead } from '../../types';
import { User } from '../../types';
import { Transaction } from '../../types';
import './CalendarMonthYearly.component.scss';

// * Component Props
interface CalendarMonthYearlyProps {
  activeDate: Date,
  prcsdCalDates: CalDate[];
}

// * Component
export default function CalendarMonthYearly({
  activeDate,
  prcsdCalDates
}: CalendarMonthYearlyProps) {
  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  // Find the month of the prcsdCalDates
  const prcsdMonth = (() => {
    const found = prcsdCalDates.find(
      (item) => item.date_is_not_trailing_or_leading
    );
    if (!found) {
      throw new Error("No valid prcsdMonth found");
    }
    return found.calendar_month.toLocaleString("en-US", { month: "long" });
  })();

  const [prcsdCalHead, setPrcsdCalHead] = useState<CalHead>(
    {
      totalRunning: 0,
      change: 0,
      max: 0,
      min: 0,
    }
  );

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
            new Date(dateData.date).getMonth() === prcsdCalDates[0].calendar_month.getMonth()
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

  // * Rendering
  return (
    <div
      className='calendarMonthYearly'
    >
      <CalendarMonthYearlyHead
        calendarTotalRunning={prcsdCalHead.totalRunning}
        calendarChange={prcsdCalHead.change}
        calendarMax={prcsdCalHead.max}
        calendarMin={prcsdCalHead.min}
        prcsdMonth={prcsdMonth}
      />
      <div
        className='body'
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
                      <DateCardYearly
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
    </div>
  );
};