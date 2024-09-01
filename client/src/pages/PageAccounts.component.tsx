// * Dependencies
import React, { useState } from 'react';
import { Account } from '../types';

// * Styling
import './PageAccounts.component.scss';

// * Components
import BoxAccountsItem from './BoxAccountsItem.component';

// ! Replace with actual data fetch
// Dummy data for accounts
const dummyAccounts = [
  { id: 1, name: 'Account 1', balance: 1000 },
  { id: 2, name: 'Account 2', balance: 1500 },
  { id: 3, name: 'Account 3', balance: 2000 },
];

interface DivAccountsListProps {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}

function DivAccountsList({ accounts }: DivAccountsListProps) {
  return (
    <div className="accounts-list">
      <h1>Accounts:</h1>
      <ul>
        {accounts.map(account => (
          <BoxAccountsItem 
            key={account.id}
            account={account}
          />
        ))}
      </ul>
    </div>
  );
}

export default function PageAccounts() {
  const [accounts, setAccounts] = useState(dummyAccounts);

  return (
    <div className="page-accounts">
      <DivAccountsList 
        accounts={accounts} 
        setAccounts={setAccounts}
      />
    </div>
  );
}