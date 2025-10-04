// * Dependencies
import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// * Other Components

// * Other Imports
import './DateSelector.component.scss';

// * Component Props
interface DateSelectorProps {
  activeView: string,
  activeDate: Date,
  setActiveDate: React.Dispatch<React.SetStateAction<Date>>
};

// * Component
export default function DateSelector({ 
  activeView,
  activeDate, 
  setActiveDate 
}: DateSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputTotalSearch, setInputTotalSearch] = useState(0);
  const [inputDisplay, setInputDisplay] = useState("");

  // * Rendering
  return (
    <DatePicker
      selected={activeDate}
      onChange={(date) => {
        if (date) setActiveDate(date);
      }}
      dateFormat={
        (activeView === 'month')
          ? "MMMM yyyy"
        : (activeView === 'year')
          ? "yyyy"
        : "MMMM yyyy"
      }
      className="datePicker"
      popperPlacement="bottom"
      showPopperArrow={false}
      showMonthDropdown
      showYearDropdown
      // dropdownMode="select"
    />
  )
};
