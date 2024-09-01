// * Dependencies
import React from 'react';

// * Styling
import './DivAmount.component.scss';

interface DivAmountProps {
  amount: number;
  currency: string;
}

export default function DivAmount({ amount, currency }: DivAmountProps) {
  return (
    <div
      className={
        [
          'div-amount',
          amount > 0 ? 'positive' : amount < 0 ? 'negative' : 'zero',
        ].join(' ')
      }
    >
      {amount < 0 && (
        <span
          className={
            [
              'negative-sign',
            ].join(' ')
          }
        >
          -
        </span>
      )}
      <span
        className={
          [
            'currency',
          ].join(' ')
        }
      >
        {currency}
      </span>
      <span
        className={
          [
            'value',
          ].join(' ')
        }
      >
        {Math.abs(amount)}
      </span>
    </div>
  );
}