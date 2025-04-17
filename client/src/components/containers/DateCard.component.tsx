// * Dependencies
import React, { useEffect, useState } from 'react';

// * Other Components
import TransactionCard from "./TransactionCard.component";

// * Other Imports
import { Transaction } from '../../types';
import './DateCard.component.scss';

// * Component Props
interface DateCardProps {
  date: Date;
  isCurrentMonth: boolean;
  selectedDate: Date;
  transactions: Array<Transaction>;
}

// * Component
export default function DateCard({ 
  date,
  isCurrentMonth,
  selectedDate,
  transactions
}: DateCardProps) {
  const isSelected = selectedDate.getDate() === date.getDate() && isCurrentMonth;

  const dateTotal = transactions
    .filter(transaction => new Date(transaction.date).toDateString() === date.toDateString())
    .reduce((total, transaction) => {
      const amount = transaction.amount;
      return transaction.type.toLowerCase() === "expense" ? total - amount : total + amount;
    }, 0);

  const dateCardVariableClassName= 'dateCard' + ' ' + (
    !isCurrentMonth ? 'nonCurrent'
    : isSelected ? 'selected'
    : ''
  );

  const totalRunningVariableClassName= 'totalRunning' + ' ' + (
    dateTotal > 0 ? 'good' : 'bad'
  );

  const totalVariableClassName= 'total' + ' ' + (
    dateTotal > 0 ? 'good' : 'bad'
  );

  
  // * Rendering
  return (
    <div 
      className={dateCardVariableClassName}
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
            {date.getDate().toString().padStart(2, "0")}
          </p>
        </div>
        <div
          className='right'
        >
          <div
            className={totalRunningVariableClassName}
          >
            {dateTotal}
          </div>
          <div
            className={totalVariableClassName}
          >
            {dateTotal}
          </div>
        </div>
      </div>
      <div
        className='body'
      >
        {transactions.map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};