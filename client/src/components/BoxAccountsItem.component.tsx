// * Dependencies
import React from 'react';
import { Account } from '../types';

// * Components
import DivAmount from './DivAmount.component';

// * Styling 
import './BoxAccountsItem.component.scss';

// Define the type for the account prop
interface BoxAccountsItemProps {
  account: Account;
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