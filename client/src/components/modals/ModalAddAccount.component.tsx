// * Dependencies
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Modal from 'react-modal';
import { ChangeEvent, FormEvent } from 'react';

// * Components
import BoxIcon from '../containers/BoxIcon.component';
import ModalCustomizeIcon from './ModalCustomizeIcon.component';

// * Types
import { Account, Icon } from '../../types';

// * Styling
import './ModalAddAccount.component.scss';

// * Interfaces
// Interface definition for props
interface ModalAddAccountProps {
  isOpen: boolean;
  onRequestClose: () => void;
  addAccount: (account: Account) => void;
  accounts: Account[];
  icons: Icon[];
  activeSubTab: { [key: string]: string };
  defaultCurrency: string;
}

// Custom type for icon style
interface IconStyle {
  icon_id: string;
  color: string;
}

// * Others
// Set the app element for accessibility with screen readers
Modal.setAppElement('#root');

// * Default Component
export default function ModalAddAccount({
  isOpen, 
  onRequestClose, 
  addAccount,
  accounts,
  icons,
  activeSubTab,
  defaultCurrency
}: ModalAddAccountProps) {
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
    archived: false,
    icon_id: '20240903091701612',
    color: '34495e'
  }), [defaultCurrency, accounts.length]);
  const [accountData, setAccountData] = useState<Account>(defaultAccountData);
  const [iconName, setIconName] = useState<string>('');
  const [iconStyle, setIconStyle] = useState<IconStyle>({
    icon_id: defaultAccountData.icon_id,
    color: defaultAccountData.color,
  });

  // * Modal states
  const [modalCustomizeIconIsOpen, setModalCustomizeIconIsOpen] = useState(false);

  // * Functions
  const findIconName = useCallback((icon_id: string) => {
    const icon = icons.find(icon => icon.id === icon_id);
    return icon ? icon.name : '';
  }, [icons]);

  // * Get the account type, then set the default values for accountData, iconStyle, and iconName
  // This only runs when the modal is opened
  useEffect(() => {
    const modifiedDefaultAccountData = {
      ...defaultAccountData,
      type: activeSubTab['/accounts']?.replace('/', '') || 'regular'
    };
    setAccountData(modifiedDefaultAccountData);
    setIconStyle({
      icon_id: modifiedDefaultAccountData.icon_id,
      color: modifiedDefaultAccountData.color
    });
    setIconName(findIconName(modifiedDefaultAccountData.icon_id));
  }, [isOpen, defaultAccountData, findIconName, activeSubTab]);

  // * Update icon values when iconStyle is changed, aka when ModalCustomizeIcon is submitted
  // This is run whenever iconStyle is changed
  useEffect(() => {
    setIconName(findIconName(iconStyle.icon_id));
    setAccountData(prev => ({
      ...prev,
      icon_id: iconStyle.icon_id,
      color: iconStyle.color
    }));
  }, [iconStyle, findIconName]);

  // * When changes to the form fields are made
  // Run every time a change is made to the form fields
  const handleChange = 
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
    {
      const { name, value } = e.target;
      setAccountData(prev => ({ ...prev, [name]: value }));
    };

  // * When form is submitted
  // Finalize the values for newAccountData, call addAccount(), and close the modal
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Compose new account data
    const now = new Date();
    const newAccountData = {
      ...accountData,
      date: now.toISOString().slice(0, 10),
      time: `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(3, '0').substring(0, 3)}`,
      id: `${now.toISOString().slice(0, 10).replace(/-/g, '')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(3, '0').substring(0, 3)}`,
      balance: parseFloat(accountData.balance.toString()),
      order: accounts.length,
      goal: accountData.type === 'funds' ? accountData.goal : 'N/A'
    };

    addAccount(newAccountData);
    onRequestClose(); 
  }, [accountData, accounts.length, addAccount, onRequestClose]);

  // Render the component
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Account"
    >
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={() => setModalCustomizeIconIsOpen(true)}>
          <BoxIcon color={iconStyle.color} icon_name={iconName} />
        </button>
        <ModalCustomizeIcon
          isOpen={modalCustomizeIconIsOpen}
          onRequestClose={() => setModalCustomizeIconIsOpen(false)}
          iconStyle={iconStyle}
          setIconStyle={setIconStyle}
          icons={icons}
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
        <div className="form-buttons">
          <button type="submit">Add Account</button>
          <button onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}
