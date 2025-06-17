// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components
import SelectDataSet from '../controls/SelectDataSet.component';

// * Other Imports
import './DataControls.component.scss';
import { DataSet } from '../../types';

// * Component Props
interface DataControlsProps {
  dataSets: Array<DataSet>,
  selectedDataSet: string,
  setSelectedDataSet: React.Dispatch<React.SetStateAction<string>>,
  handleTotalSearch: (inputTotalSearch: number) => void,
};

// * Component
export default function DataControls({ 
  dataSets,
  selectedDataSet,
  setSelectedDataSet,
  handleTotalSearch,
}: DataControlsProps) {
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

  // * Rendering
  return (
    <div
      className='dataControls'
    >
      <SelectDataSet
        dataSets={dataSets}
        selectedDataSet={selectedDataSet}
        setSelectedDataSet={setSelectedDataSet}
      />
      <div
        className='total-search'
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
    </div>
  );
};
