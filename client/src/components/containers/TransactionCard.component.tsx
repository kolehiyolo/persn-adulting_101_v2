// * Dependencies
import React, {useEffect, useState} from 'react';

// * Other Components

// * Other Imports
import { Transaction } from '../../types';
import './TransactionCard.component.scss';

// * Component Props
interface TransactionCardProps {
  transaction: Transaction;
}

// * Component
export default function TransactionCard({ 
  transaction 
}: TransactionCardProps) {
  const variableClassName='transactionCard' + ' '
    + 
    (
      transaction.tags.includes('salary') ? 'salary'
      : transaction.tags.includes('pets') ? 'pets'
      : transaction.tags.includes('cc borrow') ? 'ccBorrow'
      : transaction.tags.includes('monthly') ? 'monthly'
      : transaction.tags.includes('weekly') ? 'weekly'
      : 'expense'
    );

  console.log(transaction.tags.includes('salary') ? 'salary'
  : transaction.tags.includes('pets') ? 'pets'
  : transaction.tags.includes('cc borrow') ? 'ccBorrow'
  : transaction.tags.includes('monthly') ? 'monthly'
  : transaction.tags.includes('weekly') ? 'weekly'
  : 'expense');

  // * Rendering
  return (
    <div
      className={variableClassName}
    >
      <div
        className='transactionCardLeft'
        >
        <p
          className='transactionTitle'
        >
          {transaction.title}
        </p>
      </div>
      <div
        className='transactionCardRight'
      >
        <p
          className='transactionAmount'
        >
          {transaction.type === 'Expense' ? '-' : '' }
          {transaction.amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};