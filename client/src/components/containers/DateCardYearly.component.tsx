// * Dependencies
import React, { useEffect, useState } from 'react';

// * Other Components
import TransactionCard from "./TransactionCard.component";

// * Other Imports
import { Transaction } from '../../types';
import { CalDate } from '../../types';
import './DateCardYearly.component.scss';

// * Component Props
interface DateCardYearlyProps {
  dateData: CalDate;
  activeDate: Date;
}

// * Component
export default function DateCardYearly({ 
  dateData,
  activeDate,
}: DateCardYearlyProps) {
  const isSelected =
    activeDate.getDate() === dateData.date.getDate()
    && dateData.date_is_not_trailing_or_leading
    && dateData.date.getMonth() === activeDate.getMonth();

  const dateRunningTotalClassName = (
    dateData.date_total_running > 500000 ? 'best'
    : dateData.date_total_running > 250000 ? 'chill'
    : dateData.date_total_running > 100000 ? 'safe'
    : dateData.date_total_running > 50000 ? 'good'
    : dateData.date_total_running > 10000 ? 'breathing'
    : dateData.date_total_running > 0 ? 'struggling'
    : 'bad'
  );

  const dateCardClassName= dateRunningTotalClassName + ' ' + 'dateCardYearly' + ' ' + (
    !dateData.date_is_not_trailing_or_leading ? 'nonCurrent'
    : isSelected ? 'selected'
    : ''
  );

  // * Rendering
  return (
    <div 
      className={dateCardClassName}
    >
      <p
        className='date'
      >
        {dateData.date.getDate().toString().padStart(2, "0")}
      </p>
      <div
        className='color'
      ></div>
    </div>
  );
};