// * Dependencies
import React, { useState, useEffect } from 'react';

// * Other Components
import DateCardYearly from './DateCardYearly.component';

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

  // * Rendering
  return (
    <div
      className='calendarMonthYearly'
    >
      <div
        className='head'
      >
        { prcsdMonth }
      </div>
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