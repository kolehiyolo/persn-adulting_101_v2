import React from "react";

import { Transaction } from '../../types';

interface TransactionProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionProps> = ({ transaction }) => {
  const textColor = transaction.type === "Expense" ? "red" : "green";

  return (
    <div style={{ 
      color: textColor,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <p
        style={
          {
            margin: '0px'
          }
        }
      >
        {transaction.title}
      </p>
      <p
        style={
          {
            margin: '0px'
          }
        }
      >
        {transaction.amount}
      </p>
    </div>
  );
};

export default TransactionCard;