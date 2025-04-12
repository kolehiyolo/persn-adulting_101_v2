// * Dependencies
import React from 'react';

// * Other Components
import { ReactComponent as ArrowLeft } from '../../assets/icons/icon-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/icon-right.svg';

// * Other Imports
import './DateMover.component.scss';

// * Component Props
interface DateMoverProps {
  selectedDate: Date,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
}

// * Helper Functions
// Get the last valid day of a month
const getLastDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// * Component
export default function DateMover({ 
  selectedDate, 
  setSelectedDate 
}: DateMoverProps) {

  // Get formatted month and year
  const monthYearString = selectedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  // Get the first and last days of the selected month
  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const lastDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    getLastDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth())
  );

  const durationString = `${firstDay.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })} - ${lastDay.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`;

  // Move the date backward by one month
  const handlePrevious = () => {
    let newYear = selectedDate.getFullYear();
    let newMonth = selectedDate.getMonth() - 1;

    if (newMonth < 0) {
      newMonth = 11; // December
      newYear -= 1;
    }

    const lastValidDate = getLastDayOfMonth(newYear, newMonth);
    const newDate = new Date(
      newYear,
      newMonth,
      Math.min(selectedDate.getDate(), lastValidDate)
    );

    setSelectedDate(newDate);
  };

  // Move the date forward by one month
  const handleNext = () => {
    let newYear = selectedDate.getFullYear();
    let newMonth = selectedDate.getMonth() + 1;

    if (newMonth > 11) {
      newMonth = 0; // January
      newYear += 1;
    }

    const lastValidDate = getLastDayOfMonth(newYear, newMonth);
    const newDate = new Date(
      newYear,
      newMonth,
      Math.min(selectedDate.getDate(), lastValidDate)
    );

    setSelectedDate(newDate);
  };

  // * Rendering
  return (
    <div
      className='dateMover'
    >
      <button 
        className='button back'
        onClick={handlePrevious}
      >
        <ArrowLeft />
      </button>
      <div
        className='selectedDate'
      >
        <h2
          className='selectedDateValue'
        >
          {monthYearString}
        </h2>
        <p
          className='selectedDateDuration'
        >
          {durationString}
        </p>
      </div>
      <button
        className='button next'
        onClick={handleNext}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
