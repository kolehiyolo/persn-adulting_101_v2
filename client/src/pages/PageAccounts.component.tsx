// * Dependencies
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Account } from '../types';

// * Styling
import './PageAccounts.component.scss';

// * Components
import BoxAccountsItem from './BoxAccountsItem.component';

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
  const [accounts, setAccounts] = useState<Account[]>([]);

  // Fetch and parse the CSV data
  const fetchCSVData = async () => {
    const response = await fetch('/data/sample/accounts.csv');
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
    const accountsData = parsedData.data as Account[];

    setAccounts(accountsData);
  };

  useEffect(() => {
    fetchCSVData();
  }, []);

  return (
    <div className="page-accounts">
      <DivAccountsList 
        accounts={accounts} 
        setAccounts={setAccounts}
      />
    </div>
  );
}