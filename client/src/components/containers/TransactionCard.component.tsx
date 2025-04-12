import React from "react";

interface TransactionProps {
  transaction: { Title: string; Type: string; Amount: string };
}

const TransactionCard: React.FC<TransactionProps> = ({ transaction }) => {
  const textColor = transaction.Type === "Expense" ? "red" : "green";

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
        {transaction.Title}
      </p>
      <p
        style={
          {
            margin: '0px'
          }
        }
      >
        {transaction.Amount}
      </p>
    </div>
  );
};

export default TransactionCard;