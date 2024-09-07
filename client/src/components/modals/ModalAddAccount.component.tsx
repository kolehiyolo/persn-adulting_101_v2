// * Dependencies
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Account } from '../../types';
import { Icon } from '../../types';
import { ChangeEvent, FormEvent } from 'react';

// * Styling
import './ModalAddAccount.component.scss';

// * Components
import BoxIcon from '../containers/BoxIcon.component';

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
  const [iconName, setIconName] = useState<string>('');

  useEffect(() => {
    const findIconName = (icon_id: string) => {
      const icon = icons.find(icon => icon.id === icon_id);
      return icon ? icon.name : '';
    }
    setIconName(findIconName(accountData.icon_id));
  }, [accountData.icon_id, icons]);
  
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
        type: activeSubTab['/accounts'] === undefined ? 'regular' : activeSubTab['/accounts'].replace('/', ''),
        description: 'Dummy description',
        tag: '',
        archived: false,
        icon_id: '20240903091701589',
        color: '071abc',
      }
    );
  }, [isOpen, defaultCurrency, activeSubTab]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccountData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // * Generate order, type, and goal
    const order = accounts.length;
    const goal = accountData.type === 'funds' ? accountData.goal : 'N/A';

    // * Generate date, time, and ID
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0') +
      now.getMilliseconds().toString().padStart(3, '0').substring(0, 3);
    const id = date.replace(/-/g, '') + time;

    // * Convert balance to number
    const balance = parseFloat(accountData.balance.toString());

    // * Update accountData
    const updatedAccountData = {
      ...accountData,
      order: order,
      goal: goal,
      date: date,
      time: time,
      id: id,
      balance: balance,
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
        <BoxIcon
          color={accountData.color}
          icon_name={iconName}
        />
        <label htmlFor="name">
          <p>Account Name</p>
        <input
          type="text"
          id="name"
          name="name"
          value={accountData.name}
          onChange={handleChange}
        />
        </label>
        
        <label htmlFor="type">
          <p>Account Type</p>
          <select
            id="type"
            name="type"
            value={accountData.type}
            onChange={handleChange}
          >
            <option value="regular">Regular</option>
            <option value="debts">Debt</option>
            <option value="funds">Funds</option>
          </select>
        </label>

        <label htmlFor="description">
          <p>Description</p>
          <input
            type="text"
            id="description"
            name="description"
            value={accountData.description}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="balance">
          <p>Initial Balance</p>
          <input
            type="number"
            id="balance"
            name="balance"
            value={accountData.balance}
            onChange={handleChange}
          />
        </label>
        
        {
          accountData.type === 'funds' &&
          <label htmlFor="goal">
            <p>Goal</p>
            <input
              type="number"
              id="goal"
              name="goal"
              value={accountData.goal === 'N/A' ? 0 : accountData.goal}
              onChange={handleChange}
            />
          </label>
        }
        
        <div
          className="form-buttons"
        >
          <button type="submit">Add Account</button>
          <button onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}