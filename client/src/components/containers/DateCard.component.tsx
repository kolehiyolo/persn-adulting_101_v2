// * Dependencies
import React, { useEffect, useState } from 'react';

// * Other Components
import TransactionCard from "./TransactionCard.component";

// * Other Imports
import { Transaction } from '../../types';
import { DateData } from '../../types';
import './DateCard.component.scss';

// * Component Props
interface DateCardProps {
  dateData: DateData;
  selectedDate: Date;
}

// * Component
export default function DateCard({ 
  dateData,
  selectedDate,
}: DateCardProps) {
  const isSelected = selectedDate.getDate() === dateData.date.getDate() && dateData.isCurrentMonth;

  const dateCardClassName= 'dateCard' + ' ' + (
    !dateData.isCurrentMonth ? 'nonCurrent'
    : isSelected ? 'selected'
    : ''
  );

  const dateRunningTotalClassName = 'dateRunningTotal' + ' ' + (
    dateData.totalRunning > 500000 ? 'best'
    : dateData.totalRunning > 250000 ? 'chill'
    : dateData.totalRunning > 100000 ? 'safe'
    : dateData.totalRunning > 50000 ? 'good'
    : dateData.totalRunning > 10000 ? 'breathing'
    : dateData.totalRunning > 0 ? 'struggling'
    : 'bad'
  );

  const dateTotalClassName= 'dateTotal' + ' ' + (
    dateData.total > 0 ? 'good'
    : dateData.total === 0 ? 'neutral'
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
            {dateData.total >= 0 ? '+' : ''}{dateData.total.toLocaleString()}
          </div>
          <div
            className={dateRunningTotalClassName}
          >
            {dateData.totalRunning.toLocaleString()}
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