// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components

// * Other Imports
import './DataControls.component.scss';
import { DataSet } from '../../types';

// * Component Props
interface DataControlsProps {
  handleClickGenerateData: () => void,
  dataSets: Array<DataSet>,
  setSelectedDataSet: React.Dispatch<React.SetStateAction<string>>,
  handleTotalSearch: (inputTotalSearch: number) => void,
};

// * Component
export default function DataControls({ 
  handleClickGenerateData,
  dataSets,
  setSelectedDataSet,
  handleTotalSearch,
}: DataControlsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputTotalSearch, setInputTotalSearch] = useState(0);
  const [inputDisplay, setInputDisplay] = useState("");

  useEffect(() => {
    if (dataSets.length > 0) {
      handleDataSetChange(0); // Set the first one as default
    }
  }, [dataSets]);

  const handleDataSetChange = (index: number) => {
    const selectedDataSet = dataSets[index];
    const selectedDataSetName = `${selectedDataSet.id}-${selectedDataSet.name.replace(/\s+/g, "_")}`;
    setSelectedDataSet(selectedDataSetName);
    setSelectedIndex(index);
  };

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
      <select
        className='select'
        value={selectedIndex}
        onChange={(e) => {
          handleDataSetChange(Number(e.target.value))
        }}
      >
        {dataSets.map((dataSet, index) => (
          <option key={dataSet.id} value={index}>
            {dataSet.name} ({dataSet.household_name})
          </option>
        ))}
      </select>
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
