// * Dependencies
import React, { useState, useEffect } from 'react';

// * Other Components
import DateCard from './DateCard.component';

// * Other Imports
import { CalendarDateData } from '../../types';
import './CalendarYear.component.scss';

// * Component Props
interface CalendarYearProps {
  selectedDate: Date;
  selectedCalendarDatesData: Array<CalendarDateData>;
}

// * Component
export default function CalendarYear ({
  selectedDate,
  selectedCalendarDatesData
}: CalendarYearProps) {

  // * Rendering
  return (
    <div
      className='calendarYear'
    >
      <p>calendarYear</p>
    </div>
  );
};