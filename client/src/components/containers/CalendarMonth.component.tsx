// * Dependencies
import React, { useState, useEffect } from 'react';

// * Other Components
import DateCard from './DateCard.component';

// * Other Imports
import { CalendarDateData } from '../../types';
import './CalendarMonth.component.scss';

// * Component Props
interface CalendarMonthProps {
  selectedDate: Date;
  selectedCalendarDatesData: Array<CalendarDateData>;
}

// * Component
export default function CalendarMonth({
  selectedDate,
  selectedCalendarDatesData
}: CalendarMonthProps) {
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
            const rowDates = selectedCalendarDatesData.slice(start, end);

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