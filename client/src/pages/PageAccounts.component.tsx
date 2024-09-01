// * Dependencies
import React, { useState } from 'react';

// * Styling
import './PageAccounts.component.scss';

// Dummy data for accounts
const dummyAccounts = [
  { id: 1, name: 'Account 1', balance: 1000 },
  { id: 2, name: 'Account 2', balance: 1500 },
  { id: 3, name: 'Account 3', balance: 2000 },
];

// Define prop types for DivAccountsList
interface Account {
  id: number;
  name: string;
  balance: number;
}

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
          <li key={account.id}>
            <h2>{account.name}</h2>
            <p>Balance: ${account.balance}</p>
          </li>
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