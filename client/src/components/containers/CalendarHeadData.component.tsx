// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components
import { ReactComponent as CalendarMax } from '../../assets/icons/icon-calendar-max.svg';
import { ReactComponent as CalendarMin } from '../../assets/icons/icon-calendar-min.svg';

// * Other Imports
import './CalendarHeadData.component.scss';

// * Component Props
interface CalendarHeadDataProps {
  calendarTotalRunning: number,
  calendarChange: number,
  calendarMax: number,
  calendarMin: number,
};

// * Component
export default function CalendarHeadData({ 
  calendarTotalRunning,
  calendarChange,
  calendarMax,
  calendarMin
}: CalendarHeadDataProps) {
  // * Rendering
  return (
    <div
      className='calendarHeadData'
    >
      <div
        className='left'
      >
        <p
          className='calendarTotalRunning'
        >
          {calendarTotalRunning.toLocaleString()}
        </p>
        <p
          className='calendarChange'
          >
          {calendarChange >= 0 ? '+' : ''}{calendarChange.toLocaleString()}
        </p>
      </div>
      <div
        className='right'
      >
        <p
          className='calendarMax'
        >
          <CalendarMax />
          <p>
            {calendarMax.toLocaleString()}
          </p>
        </p>
        <p
          className='calendarMin'
        >
          <CalendarMin />
          <p>
            {calendarMin.toLocaleString()}
          </p>
        </p>
      </div>
    </div>
  );
};
