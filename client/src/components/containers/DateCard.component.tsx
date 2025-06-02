// * Dependencies
import React, { useEffect, useState } from 'react';

// * Other Components
import TransactionCard from "./TransactionCard.component";

// * Other Imports
import { Transaction } from '../../types';
import { CalendarDateData } from '../../types';
import './DateCard.component.scss';

// * Component Props
interface DateCardProps {
  dateData: CalendarDateData;
  selectedDate: Date;
}

// * Component
export default function DateCard({ 
  dateData,
  selectedDate,
}: DateCardProps) {
  const isSelected = selectedDate.getDate() === dateData.date.getDate() && dateData.date_is_not_trailing_or_leading;

  const dateCardClassName= 'dateCard' + ' ' + (
    !dateData.date_is_not_trailing_or_leading ? 'nonCurrent'
    : isSelected ? 'selected'
    : ''
  );

  const dateRunningTotalClassName = 'dateRunningTotal' + ' ' + (
    dateData.date_total_running > 500000 ? 'best'
    : dateData.date_total_running > 250000 ? 'chill'
    : dateData.date_total_running > 100000 ? 'safe'
    : dateData.date_total_running > 50000 ? 'good'
    : dateData.date_total_running > 10000 ? 'breathing'
    : dateData.date_total_running > 0 ? 'struggling'
    : 'bad'
  );

  const dateTotalClassName= 'dateTotal' + ' ' + (
    dateData.date_change > 0 ? 'good'
    : dateData.date_change === 0 ? 'neutral'
    : 'bad'
  );

  
  // * Rendering
  return (
    <div 
      className={dateCardClassName}
    >
      <div
        className='head'
      >
        <div
          className='left'
        >
          <p
            className='date'
          >
            {dateData.date.getDate().toString().padStart(2, "0")}
          </p>
        </div>
        <div
          className='right'
        >
          <div
            className={dateTotalClassName}
          >
            {dateData.date_change >= 0 ? '+' : ''}{dateData.date_change.toLocaleString()}
          </div>
          <div
            className={dateRunningTotalClassName}
          >
            {dateData.date_total_running.toLocaleString()}
          </div>
        </div>
      </div>
      <div
        className='body scrollable'
      >
        {dateData.transactions.map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};