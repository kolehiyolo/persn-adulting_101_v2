// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components
import { ReactComponent as ArrowLeft } from '../../assets/icons/icon-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/icon-right.svg';
import DateSelector from './DateSelector.component';

// * Other Imports
import './DateMover.component.scss';

// * Component Props
interface DateMoverProps {
  activeView: string,
  setActiveView: React.Dispatch<React.SetStateAction<string>>
  activeDate: Date,
  setActiveDate: React.Dispatch<React.SetStateAction<Date>>
};

// * Component
export default function DateMover({ 
  activeView,
  setActiveView,
  activeDate, 
  setActiveDate 
}: DateMoverProps) {
  // * Variables
  let activeDateValue = '';
  let activeDateDuration = '';

  // * Helper Functions
  // Get the last valid day of a month
  const getLastDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // * Set variable values
  const setActiveDateValue = (activeDate: Date) => {
    const result = activeDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });

    activeDateValue = result;
  };

  const setActiveDateDuration = (activeDate: Date) => {
    // Get the first day of the selected month
    const firstDay = new Date(
      activeDate.getFullYear(),
      activeDate.getMonth(),
      1
    );
    // Get the last day of the selected month
    const lastDay = new Date(
      activeDate.getFullYear(),
      activeDate.getMonth(),
      getLastDayOfMonth(activeDate.getFullYear(), activeDate.getMonth())
    );

    // Generating activeDateDuration
    const result = `${firstDay.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })} - ${lastDay.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })}`;
    
    activeDateDuration = result;
  };

  setActiveDateValue(activeDate);
  setActiveDateDuration(activeDate);

  // * Button handling
  const handlePrevious = () => {
    let newYear = activeDate.getFullYear();
    let newMonth = activeDate.getMonth() - 1;

    // If newMonth is December
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    // Check what the lastValidDate of the newMonth is
    const lastValidDate = getLastDayOfMonth(newYear, newMonth);

    // Generate newDate, comparing activeDate's original date number and lastValidDate
    // Whatever's lower is what's accepted, so if the original activeDate was March 31, 2025, newDate is Feb 28, 2025, since 28 is lower than 31
    const newDate = new Date(
      newYear,
      newMonth,
      Math.min(activeDate.getDate(), lastValidDate)
    );

    setActiveDate(newDate);
  };

  const handleNext = () => {
    let newYear = activeDate.getFullYear();
    let newMonth = activeDate.getMonth() + 1;

    // If newMonth is January
    if (newMonth > 11) {
      newMonth = 0; // January
      newYear += 1;
    }

    // Check what the lastValidDate of the newMonth is
    const lastValidDate = getLastDayOfMonth(newYear, newMonth);

    // Generate newDate, with the same caveats as handleBack()
    const newDate = new Date(
      newYear,
      newMonth,
      Math.min(activeDate.getDate(), lastValidDate)
    );

    setActiveDate(newDate);
  };

  const handleViewChange = (index: string) => {
    console.log(`view change to ${index}`);
    setActiveView(index);
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
      <select
        className='select'
        value={activeView}
        onChange={(e) => {
          console.log(`ONCHANGE`);
          handleViewChange(e.target.value)
        }}
      >
        <option key="month" value="month">
          Month
        </option>
        <option key="year" value="year">
          Year
        </option>
      </select>
      <div
        className='activeDate'
      >
        <DateSelector 
          activeDate={activeDate} 
          setActiveDate={setActiveDate}
        />
        <p
          className='activeDateDuration'
        >
          {activeDateDuration}
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
