// * Dependencies
import React from 'react';
import { Account } from '../types';

// * Styling 
import './BoxAccountsItem.component.scss';

// Define the type for the account prop
interface BoxAccountsItemProps {
  account: Account;
}

interface DivAmountProps {
  amount: number;
  currency: string;
}

// ! TURN INTO OWN COMPONENT
function BoxIcon({ account }: BoxAccountsItemProps) {
  // ! TO REPLACE
  const dummyIconUrl = 'https://site-assets.fontawesome.com/releases/v6.6.0/svgs/solid/code.svg';

  return (
    <div
      className={
        [
          'box-icon',
        ].join(' ')
      }
      style={{
        backgroundColor: '#' + account.color,
      }}
    >
      <img
        src={dummyIconUrl}
        alt={account.name}
      />
    </div>
  )
}

// ! TURN INTO OWN COMPONENT
function DivAmount({ amount, currency }: DivAmountProps) {
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

// ! ADD PROGRESS BAR FOR ACCOUNTS WITH GOALS
export default function BoxAccountsItem({ account }: BoxAccountsItemProps) {
  return (
    <li 
      key={account.id}
      className="box-accounts-item"
    >
      <div className='left'>
        <BoxIcon 
          account={account}
        />
      </div>
      <div className='right'>
        <div className='info'>
          <h3
            className={
              [
                'name',
              ].join(' ')
            }
          >
            {account.name}
          </h3>
          <DivAmount 
            amount={Number(account.balance)}
            currency={account.currency}
          />
          {account.description && (
            <p
              className={
                [
                  'description',
                ].join(' ')
              }
            >
              {account.description}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}