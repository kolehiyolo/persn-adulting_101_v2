// * Dependencies
import React from 'react';
import { Account } from '../types';
import { Icon } from '../types';

// * Styling
import './PageAccounts.component.scss';

// * Components
import BoxAccountsItem from '../components/BoxAccountsItem.component';

interface PageAccountsProps {
  accounts: Account[];
  icons: Icon[];
}

function DivAccountsList({ accounts, icons }: PageAccountsProps) {
  const findIconName = (icon_id: string) => {
    const icon = icons.find(icon => {
      return icon.id === icon_id;
    });
    return icon ? icon.name : '';
  }

  return (
    <div className="accounts-list">
      <h1>Accounts:</h1>
      <ul>
        {accounts.map(account => (
          <BoxAccountsItem 
            key={account.id}
            account={account}
            icon_name={findIconName(account.icon_id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default function PageAccounts({ accounts, icons }: PageAccountsProps) {
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
        icons={icons}
      />
    </div>
  );
}