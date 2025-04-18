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

  // Calculate the total amount for a specific date by summing income and subtracting expenses
  const dateTotal = transactions
    .filter(transaction => 
      // Step 1: Filter transactions to include only those that match the specific `date`
      new Date(transaction.date).toDateString() === date.toDateString()
    )
    .reduce((total, transaction) => {
      // Step 2: Reduce the filtered transactions into a single total amount
      // If the transaction is an expense, subtract the amount from total
      // Otherwise, assume it's income and add the amount to total
      return transaction.type.toLowerCase() === "expense"
        ? total - transaction.amount
        : total + transaction.amount;
    }
  , 0); // Step 3: Start with a total of 0

  const dateCardClassName= 'dateCard' + ' ' + (
    !isCurrentMonth ? 'nonCurrent'
    : isSelected ? 'selected'
    : ''
  );

  const dateRunningTotalClassName = 'dateRunningTotal' + ' ' + (
    dateTotal > 0 ? 'good' : 'bad'
  );

  const dateTotalClassName= 'dateTotal' + ' ' + (
    dateTotal > 0 ? 'good' : 'bad'
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
            {date.getDate().toString().padStart(2, "0")}
          </p>
        </div>
        <div
          className='right'
        >
          <div
            className={dateTotalClassName}
          >
            {dateTotal >= 0 ? '+' : ''}{dateTotal.toLocaleString()}
          </div>
          <div
            className={dateRunningTotalClassName}
          >
            {dateTotal.toLocaleString()}
          </div>
        </div>
      </div>
      <div
        className='body scrollable'
      >
        {transactions.map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};