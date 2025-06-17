// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components

// * Other Imports
import './SelectDataSet.component.scss';
import { DataSet } from '../../types';

// * Component Props
interface SelectDataSetProps {
  dataSets: Array<DataSet>,
  selectedDataSet: string,
  setSelectedDataSet: React.Dispatch<React.SetStateAction<string>>,
};

// * Component
export default function SelectDataSet({ 
  dataSets,
  selectedDataSet,
  setSelectedDataSet,
}: SelectDataSetProps) {
  const handleSelectChange = (value: string) => {
    console.log(`selectDataSet(${value})`);
    setSelectedDataSet(value);
  };

  // * Rendering
  return (
    <select
      className='select'
      value={selectedDataSet}
      onChange={(e) => {
        handleSelectChange(e.target.value)
      }}
    >
      {dataSets.map((dataSet) => (
        <option key={dataSet.id} value={dataSet.folder_name}>
          {dataSet.name} ({dataSet.household_name})
        </option>
      ))}
    </select>
  );
};