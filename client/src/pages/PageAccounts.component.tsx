// * Dependencies
import React, { useState, useEffect, useCallback } from 'react';
import { Account } from '../types';
import { Icon } from '../types';

// * Styling
import './PageAccounts.component.scss';

// * Components
import DivAmount from '../components/containers/DivAmount.component';
import DivAccountsListContainer from '../components/containers/DivAccountsListContainer.component';

// * Interfaces
interface PageAccountsProps {
  accounts: Account[];
  icons: Icon[];
  activeSubTab: { [key: string]: string };
  defaultCurrency: string;
}

export default function PageAccounts({ accounts, icons, activeSubTab, defaultCurrency}: PageAccountsProps) {
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  
  const findSubTabTotal = () => {
    const subTabTotal = filteredAccounts.reduce((total, account) => {
      return total + account.balance;
    }, 0);
    return subTabTotal;
  }

  const findFilteredAccounts = useCallback(() => {
    const filteredAccounts = accounts.filter(account => {
      return account.type === activeSubTab['/accounts'].replace('/', '');
    });
    setFilteredAccounts(filteredAccounts);
  }, [accounts, activeSubTab]);

  useEffect(() => {
    findFilteredAccounts();
  }, [findFilteredAccounts]);

  const handleButtonAddClick = () => {
    console.log('Add Account button clicked');
  };

  return (
    <div 
      className={
        [
          `page-accounts`,
          `page`,
        ].join(' ')
      }
    >
      <div className="page-header">
        <h2>Total</h2>
        <DivAmount
          amount={findSubTabTotal()}
          currency={defaultCurrency}
        />
      </div>
      <DivAccountsListContainer 
        filteredAccounts={filteredAccounts} 
        icons={icons}
        activeSubTab={activeSubTab}
      />
      <div
        className="page-buttons"
      >
        <button
          className="account-button-add"
          onClick={handleButtonAddClick}
        >
          Add Account
        </button>
        <button
          className="account-button-archived"
        >
          Show Archived
        </button>
      </div>
    </div>
  );
}