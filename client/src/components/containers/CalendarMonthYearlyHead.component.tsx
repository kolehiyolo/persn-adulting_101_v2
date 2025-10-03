// * Dependencies
import React, { useState, useEffect } from 'react';

// * Other Components
import { ReactComponent as CalendarMax } from '../../assets/icons/icon-calendar-max.svg';
import { ReactComponent as CalendarMin } from '../../assets/icons/icon-calendar-min.svg';

// * Other Imports
import { CalDate } from '../../types';
import { CalHead } from '../../types';
import { User } from '../../types';
import { Transaction } from '../../types';
import './CalendarMonthYearlyHead.component.scss';

// * Component Props
interface CalendarMonthYearlyProps {
  calendarTotalRunning: number,
  calendarChange: number,
  calendarMax: number,
  calendarMin: number,
  prcsdMonth: string
}

// * Component
export default function CalendarMonthYearlyHead({
  calendarTotalRunning,
  calendarChange,
  calendarMax,
  calendarMin,
  prcsdMonth
}: CalendarMonthYearlyProps) {
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
      className='calendarMonthYearlyHead'
    >
      <div
        className='left'
      >
        <p
          className='monthText'
        >
          { prcsdMonth }
        </p>
        <div className="runningAndChange">
          <p
            className="calendarTotalRunning"
            >
            {calendarTotalRunning.toLocaleString()}
          </p>
          <p
            className={calendarChangeClassName}
            >
            {calendarChange >= 0 ? '+' : ''}{calendarChange.toLocaleString()}
          </p>
        </div>
      </div>
      <div
        className='right'
      >
        <div
          className={calendarMaxClassName}
        >
          <CalendarMax />
          <p>
            {calendarMax.toLocaleString()}
          </p>
        </div>
        <div
          className={calendarMinClassName}
        >
          <CalendarMin />
          <p>
            {calendarMin.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};