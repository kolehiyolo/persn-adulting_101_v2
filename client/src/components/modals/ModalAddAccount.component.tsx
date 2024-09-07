// * Dependencies
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Account } from '../../types';
import { Icon } from '../../types';
import { ChangeEvent, FormEvent } from 'react';

// * Styling
import './ModalAddAccount.component.scss';

// * Components

// * Interfaces
interface ModalAddAccountProps {
  isOpen: boolean;
  onRequestClose: () => void;
  addAccount: (account: Account) => void;
  accounts: Account[];
  icons: Icon[];
  activeSubTab: { [key: string]: string };
  defaultCurrency: string;
}

// * Others
Modal.setAppElement('#root'); // This helps with screen readers and accessibility.

export default function ModalAddAccount(
  { 
    isOpen, 
    onRequestClose, 
    addAccount,
    accounts,
    icons,
    activeSubTab,
    defaultCurrency
  }: ModalAddAccountProps
) {
  const [accountData, setAccountData] = useState<Account>(
    {
      id: '',
      date: '',
      time: '',
      name: '',
      balance: 0,
      goal: 'N/A',
      currency: defaultCurrency,
      order: 0,
      type: 'regular',
      description: 'Dummy description',
      tag: '',
      archived: false,
      icon_id: '20240903091701589',
      color: '071abc',
    }
  );

  useEffect(() => {
    setAccountData(
      {
        id: '',
        date: '',
        time: '',
        name: '',
        balance: 0,
        goal: 'N/A',
        currency: defaultCurrency,
        order: 0,
        type: 'regular',
        description: 'Dummy description',
        tag: '',
        archived: false,
        icon_id: '20240903091701589',
        color: '071abc',
      }
    );
  }, [isOpen, defaultCurrency]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // * Generate order, type, and goal
    const order = accounts.length;
    const type = activeSubTab['/accounts'].replace('/', '');
    const goal = type === 'funds' ? '10000' : '';

    // * Generate date, time, and ID
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0') +
      now.getMilliseconds().toString().padStart(3, '0').substring(0, 3);
    const id = date.replace(/-/g, '') + time;

    // * Update accountData
    const updatedAccountData = {
      ...accountData,
      order: order,
      type: type,
      goal: goal,
      date: date,
      time: time,
      id: id,
    };

    addAccount(updatedAccountData);
    onRequestClose(); // Close modal after submit
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Account"
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Account Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={accountData.name}
          onChange={handleChange}
        />

        <label htmlFor="balance">Initial Balance</label>
        <input
          type="number"
          id="balance"
          name="balance"
          value={accountData.balance}
          onChange={handleChange}
        />

        <button type="submit">Add Account</button>
        <button onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
}