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
  const calendarTotalRunningClassName = 'calendarTotalRunning' + ' ' + (
    calendarTotalRunning > 500000 ? 'best'
    : calendarTotalRunning > 250000 ? 'chill'
    : calendarTotalRunning > 100000 ? 'safe'
    : calendarTotalRunning > 50000 ? 'good'
    : calendarTotalRunning > 10000 ? 'breathing'
    : calendarTotalRunning > 0 ? 'struggling'
    : 'bad'
  );

  const calendarChangeClassName = 'calendarChange' + ' ' + (
    calendarChange > 0 ? 'good'
    : calendarChange === 0 ? 'neutral'
    : 'bad'
  );

  const calendarMaxClassName = 'calendarMax' + ' ' + (
    calendarMax > 500000 ? 'best'
    : calendarMax > 250000 ? 'chill'
    : calendarMax > 100000 ? 'safe'
    : calendarMax > 50000 ? 'good'
    : calendarMax > 10000 ? 'breathing'
    : calendarMax > 0 ? 'struggling'
    : 'bad'
  );

  const calendarMinClassName = 'calendarMin' + ' ' + (
    calendarMin > 500000 ? 'best'
    : calendarMin > 250000 ? 'chill'
    : calendarMin > 100000 ? 'safe'
    : calendarMin > 50000 ? 'good'
    : calendarMin > 10000 ? 'breathing'
    : calendarMin > 0 ? 'struggling'
    : 'bad'
  );


  // * Rendering
  return (
    <div
      className='calendarHeadData'
    >
      <div
        className='left'
      >
        <p
          className={calendarTotalRunningClassName}
        >
          {calendarTotalRunning.toLocaleString()}
        </p>
        <p
          className={calendarChangeClassName}
          >
          {calendarChange >= 0 ? '+' : ''}{calendarChange.toLocaleString()}
        </p>
      </div>
      <div
        className='right'
      >
        <p
          className={calendarMaxClassName}
        >
          <CalendarMax />
          <p>
            {calendarMax.toLocaleString()}
          </p>
        </p>
        <p
          className={calendarMinClassName}
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
