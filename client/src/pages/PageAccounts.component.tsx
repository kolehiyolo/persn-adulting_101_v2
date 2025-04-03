// * Dependencies
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Account } from '../types';
import { Icon } from '../types';

// * Styling
import './PageAccounts.component.scss';

// * Components
import DivAmount from '../components/containers/DivAmount.component';
import DivAccountsListContainer from '../components/containers/DivAccountsListContainer.component';
import ModalAddAccount from '../components/modals/ModalAddAccount.component';
import ModalEditAccount from '../components/modals/ModalEditAccount.component';

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
  const [modalEditAccountIsOpen, setModalEditAccountIsOpen] = useState(false);
  
  // * States
  const defaultAccountData = useMemo(() => ({
    id: '',
    date: '',
    time: '',
    name: '',
    balance: 0,
    goal: 'N/A',
    currency: defaultCurrency,
    order: accounts.length,
    type: 'regular',
    description: 'Dummy description',
    tag: '',
    icon_id: '20240903091701612',
    color: '34495e',
    archived: false,
    deleted: false,
  }), [defaultCurrency, accounts.length]);

  const [editingAccount, setEditingAccount] = useState(defaultAccountData);
  
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

  const handleModalEditAccountClose = () => {
    console.log('ModalEditAccount closed');
    setModalEditAccountIsOpen(false);
  }

  const addAccount = (account: Account) => {
    console.log('Account added:', account);
    setAccounts([...accounts, account]);
    addAccountToCSV(account);
  }
  
  const editAccount = (account: Account) => {
    console.log('Account edited:', account);
    // setAccounts([...accounts, account]);
    // addAccountToCSV(account);
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
  
  const handleClickAccountToEdit = (account: Account) => {
    setEditingAccount(account);
    setModalEditAccountIsOpen(true);
  }

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
        handleClickAccountToEdit={handleClickAccountToEdit}
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

        <ModalEditAccount
          isOpen={modalEditAccountIsOpen}
          onRequestClose={handleModalEditAccountClose}
          editAccount={editAccount}
          editingAccount={editingAccount}
          icons={icons}
        />
      </div>
    </div>
  );
}