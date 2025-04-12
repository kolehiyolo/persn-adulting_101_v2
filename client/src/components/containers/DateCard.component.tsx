// * Dependencies
import React, { useEffect, useState } from 'react';

// * Other Components
import TransactionCard from "./TransactionCard.component";

// * Other Imports
import { Transaction } from '../../types';

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
  
  return (
    <div 
      style={
        { 
          border: '1px solid #ccc',
          // margin: '5px',
          backgroundColor: 
            !isCurrentMonth ? '#ddd' :
            isSelected ? 'lightblue' :
            'white',
          width: 'calc(100% / 7)',
          textAlign: 'center',
          boxSizing: 'border-box'
        }
      }
    >
      <div
        className="head"
        style={
          { 
            padding: '10px',
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }
        }
      >
        <div
          className="date-total-running"
          style= {
            {
              padding: '10px',
              backgroundColor:
                dateTotal > 0 ? 'green' :
                dateTotal < 0 ? 'red' :
                '#ddd'
            }
          }
        >
          {dateTotal}
        </div>
        {date.getDate().toString().padStart(2, "0")}
        <div
          className="date-total"
          style= {
            {
              padding: '10px',
              backgroundColor:
                dateTotal > 0 ? 'green' :
                dateTotal < 0 ? 'red' :
                '#ddd'
            }
          }
        >
          {dateTotal}
        </div>
      </div>
      <div
        className="body"
        style={
          {
            overflowY: 'auto',
            padding: '0px 10px',
          }
        }
      >
        {transactions.map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};