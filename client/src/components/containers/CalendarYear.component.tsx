// * Dependencies
import React, { useState, useEffect } from 'react';

// * Other Components
import DateCard from './DateCard.component';

// * Other Imports
import { CalendarDateData } from '../../types';
import './CalendarYear.component.scss';

// * Component Props
interface CalendarYearProps {
  activeDate: Date;
  selectedCalendarDatesData: Array<CalendarDateData>;
}

// * Component
export default function CalendarYear ({
  activeDate,
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