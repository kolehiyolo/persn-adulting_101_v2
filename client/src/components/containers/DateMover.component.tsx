// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components
import { ReactComponent as ArrowLeft } from '../../assets/icons/icon-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/icon-right.svg';

// * Other Imports
import './DateMover.component.scss';

// * Component Props
interface DateMoverProps {
  selectedDate: Date,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
};

// * Component
export default function DateMover({ 
  selectedDate, 
  setSelectedDate 
}: DateMoverProps) {
  // * Variables
  let selectedDateValue = '';
  let selectedDateDuration = '';

  // * Helper Functions
  // Get the last valid day of a month
  const getLastDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // * Set variable values
  const setSelectedDateValue = (selectedDate: Date) => {
    const result = selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });

    selectedDateValue = result;
  };

  const setSelectedDateDuration = (selectedDate: Date) => {
    // Get the first day of the selected month
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    // Get the last day of the selected month
    const lastDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      getLastDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth())
    );

    // Generating selectedDateDuration
    const result = `${firstDay.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })} - ${lastDay.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })}`;
    
    selectedDateDuration = result;
  };

  setSelectedDateValue(selectedDate);
  setSelectedDateDuration(selectedDate);

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
          {selectedDateValue}
        </h2>
        <p
          className='selectedDateDuration'
        >
          {selectedDateDuration}
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
};
