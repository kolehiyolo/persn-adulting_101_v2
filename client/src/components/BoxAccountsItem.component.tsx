// * Dependencies
import React from 'react';
import { Account } from '../types';

// * Components
import DivAmount from './DivAmount.component';
import BoxIcon from './BoxIcon.component';

// * Styling 
import './BoxAccountsItem.component.scss';

// * Type definition
interface BoxAccountsItemProps {
  account: Account;
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