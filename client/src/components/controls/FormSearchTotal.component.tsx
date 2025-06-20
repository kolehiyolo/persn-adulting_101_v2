// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components

// * Other Imports
import './FormSearchTotal.component.scss';
import { CalDate } from '../../types';

// * Component Props
interface FormSearchTotalProps {
  calendarDatesData: Array<CalDate>,
  setActiveDate: React.Dispatch<React.SetStateAction<Date>>,
};

// * Component
export default function FormSearchTotal({ 
  calendarDatesData,
  setActiveDate,
}: FormSearchTotalProps) {
  const [inputDisplay, setInputDisplay] = useState("");

  function formatWithCommas(value: string) {
    const number = parseFloat(value.replace(/,/g, ''));
    if (isNaN(number)) return '';
    return number.toLocaleString('en-US');
  }
  
  function parseFormatted(value: string) {
    return value.replace(/,/g, '');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseFormatted(e.target.value);
    if (!/^\d*\.?\d*$/.test(rawValue)) return; // prevent invalid input
    setInputDisplay(formatWithCommas(rawValue));
  };

  const handleSubmit = () => {
    const numericValue = parseFloat(parseFormatted(inputDisplay));
    if (!isNaN(numericValue)) {
      handleTotalSearch(numericValue);
    }
  };

  const handleTotalSearch = (inputTotalSearch: number) => {
    console.log(`Trigger handleTotalSearch(${inputTotalSearch})`);
  
    const matching = calendarDatesData
      .filter(item => item.date_total_running > inputTotalSearch)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  
    const earliestMatch = matching[0];
  
    if (earliestMatch) {
      console.log("Earliest match:", earliestMatch);
      setActiveDate(earliestMatch.date);
      // Optionally do something else with earliestMatch
    } else {
      console.log("No match found with date_total_running > inputTotalSearch");
    }
  };

  // * Rendering
  return (
    <div
      className='form-search-total'
    >
      <input
        type="text"
        inputMode="decimal"
        value={inputDisplay}
        onChange={handleChange}
        className="input"
        placeholder="Search total"
      />
      <button
      onClick={handleSubmit} className="submit"
      >
        Search
      </button>
    </div>
  );
};