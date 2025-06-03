// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components

// * Other Imports
import './DataControls.component.scss';
import { DataSet } from '../../types';

// * Component Props
interface DataControlsProps {
  handleClickGenerateData: () => void,
  dataSets: Array<DataSet>
  setSelectedDataSet: React.Dispatch<React.SetStateAction<string>>
};

// * Component
export default function DataControls({ 
  handleClickGenerateData,
  dataSets,
  setSelectedDataSet,
}: DataControlsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  // * Rendering
  return (
    <div
      className='dataControls'
    >
      <select
        className='select'
        value={selectedIndex}
        onChange={(e) => handleDataSetChange(Number(e.target.value))}
      >
        {dataSets.map((dataSet, index) => (
          <option key={dataSet.id} value={index}>
            {dataSet.name} ({dataSet.household_name})
          </option>
        ))}
      </select>
      <button 
        className='button'
        onClick={handleClickGenerateData}
      >
        Generate
      </button>

    </div>
  );
};
