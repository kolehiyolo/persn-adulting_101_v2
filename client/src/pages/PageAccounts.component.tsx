// * Dependencies
import React, { useState, useEffect, useCallback } from 'react';
import { Account } from '../types';
import { Icon } from '../types';

// * Styling
import './PageAccounts.component.scss';

// * Components
import DivAmount from '../components/containers/DivAmount.component';
import DivAccountsListContainer from '../components/containers/DivAccountsListContainer.component';
import ModalAddAccount from '../components/modals/ModalAddAccount.component';

// * Interfaces
interface PageAccountsProps {
  accounts: Account[];
  icons: Icon[];
  activeSubTab: { [key: string]: string };
  defaultCurrency: string;
  setAccounts: (accounts: Account[]) => void;
}

export default function PageAccounts(
  { 
    accounts,
    icons,
    activeSubTab,
    defaultCurrency,
    setAccounts
  }: PageAccountsProps) 
{
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [modalAddAccountIsOpen, setModalAddAccountIsOpen] = useState(false);
  
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
    setModalAddAccountIsOpen(true);
  };

  const handleModalAddAccountClose = () => {
    console.log('ModalAddAccount closed');
    setModalAddAccountIsOpen(false);
  }

  const addAccount = (account: Account) => {
    console.log('Account added:', account);
    setAccounts([...accounts, account]);
    addAccountToCSV(account);
  }

  const addAccountToCSV = async (account: Account) => {
    try {
      const response = await fetch('http://localhost:5000/account/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add account to CSV');
      }
      
      console.log('Account added successfully');
    } catch (error) {
      console.error('Error:', error);
    }
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

        <ModalAddAccount
          isOpen={modalAddAccountIsOpen}
          onRequestClose={handleModalAddAccountClose}
          addAccount={addAccount}
          accounts={accounts}
          icons={icons}
          activeSubTab={activeSubTab}
          defaultCurrency={defaultCurrency}
        />
      </div>
    </div>
  );
}