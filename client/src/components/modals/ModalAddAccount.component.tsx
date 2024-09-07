// * Dependencies
import React, { useState } from 'react';
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
      goal: '',
      currency: '',
      order: 0,
      type: '',
      description: '',
      tag: '',
      archived: false,
      icon_id: '',
      color: '',
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // addAccount(accountData);
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