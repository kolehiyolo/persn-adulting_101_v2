// * Dependencies
import React from 'react';
import { Account } from '../types';

// * Styling
import './PageAccounts.component.scss';

// * Components
import BoxAccountsItem from '../components/BoxAccountsItem.component';

interface PageAccountsProps {
  accounts: Account[];
}

function DivAccountsList({ accounts }: PageAccountsProps) {
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

export default function PageAccounts({ accounts }: PageAccountsProps) {
  return (
    <div 
      className={
        [
          `page-accounts`,
          `page`,
        ].join(' ')
      }
    >
      <DivAccountsList 
        accounts={accounts} 
      />
    </div>
  );
}