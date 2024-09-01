// * Dependencies
import React from 'react';
import { Account } from '../types';

// * Styling 
import './BoxAccountsItem.component.scss';

// Define the type for the account prop
interface BoxAccountsItemProps {
  account: Account;
}

export default function BoxAccountsItem({ account }: BoxAccountsItemProps) {
  return (
    <li 
      key={account.id}
      className="box-accounts-item"
    >
      <h2>{account.name}</h2>
      <p>Balance: ${account.balance}</p>
    </li>
  );
}