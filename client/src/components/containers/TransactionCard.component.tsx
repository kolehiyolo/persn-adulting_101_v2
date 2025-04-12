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
  const variableClassName='transactionCard' + ' ' + transaction.type.toLowerCase();

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
          {transaction.amount}
        </p>
      </div>
    </div>
  );
};