// * Dependencies
import React, { useState, useEffect } from 'react';
import { Account } from '../types';
import { Icon } from '../types';

// * Styling
import './PageAccounts.component.scss';

// * Components
import BoxAccountsItem from '../components/BoxAccountsItem.component';

interface PageAccountsProps {
  accounts: Account[];
  icons: Icon[];
  activeSubTab: { [key: string]: string };
}

function DivAccountsList({ accounts, icons, activeSubTab }: PageAccountsProps) {
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const filteredAccounts = accounts.filter(account => {
      return account.type === activeSubTab['/accounts'].replace('/', '');
    });
    setFilteredAccounts(filteredAccounts);
  }, [accounts, activeSubTab]);
  
  const findIconName = (icon_id: string) => {
    const icon = icons.find(icon => {
      return icon.id === icon_id;
    });
    return icon ? icon.name : '';
  }

  return (
    <div className="accounts-list">
      <ul>
        {filteredAccounts.map(account => (
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

export default function PageAccounts({ accounts, icons, activeSubTab}: PageAccountsProps) {
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
        activeSubTab={activeSubTab}
      />
    </div>
  );
}