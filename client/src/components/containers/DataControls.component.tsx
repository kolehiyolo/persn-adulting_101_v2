// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components
import SelectDataSet from '../controls/SelectDataSet.component';
import FormSearchTotal from '../controls/FormSearchTotal.component';

// * Other Imports
import './DataControls.component.scss';
import { DataSet } from '../../types';
import { CalendarDateData } from '../../types';

// * Component Props
interface DataControlsProps {
  dataSets: Array<DataSet>,
  selectedDataSet: string,
  setSelectedDataSet: React.Dispatch<React.SetStateAction<string>>,
  calendarDatesData: Array<CalendarDateData>,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
};

// * Component
export default function DataControls({ 
  dataSets,
  selectedDataSet,
  setSelectedDataSet,
  calendarDatesData,
  setSelectedDate,
}: DataControlsProps) {
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
      <FormSearchTotal
        calendarDatesData={calendarDatesData}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};
