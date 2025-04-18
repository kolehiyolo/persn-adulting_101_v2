// * Dependencies
import React from 'react';
import { Account } from '../../types';

// * Components
import DivAmount from './DivAmount.component';
import BoxIcon from './BoxIcon.component';
import DivCircularProgress from './DivCircularProgress.component';

// * Styling 
import './BoxAccountsItem.component.scss';

// * Type definition
interface BoxAccountsItemProps {
  account: Account;
  icon_name: string;
  handleClickAccountToEdit: (account: Account) => void;
}

export default function BoxAccountsItem({ account, icon_name, handleClickAccountToEdit }: BoxAccountsItemProps) {
  return (
    <li 
      key={account.id}
      className="box-accounts-item"
    >
      <div className='left'>
        <button onClick={() => handleClickAccountToEdit(account)}>
          <BoxIcon 
            color={account.color}
            icon_name={icon_name}
          />
        </button>
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
        {account.goal !== 'N/A' && (
          <DivCircularProgress
            percentage={
              Math.round((Number(account.balance) / Number(account.goal)) * 100)
            }
          />
        )}
      </div>
    </li>
  );
}