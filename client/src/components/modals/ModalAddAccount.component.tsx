// * Dependencies
import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { Account } from '../../types';
import { Icon } from '../../types';

// * Styling
import './ModalAddAccount.component.scss';

// * Components

// * Interfaces
interface ModalAddAccountProps {
  accounts: Account[];
  icons: Icon[];
  activeSubTab: { [key: string]: string };
  defaultCurrency: string;
}

// * Others
Modal.setAppElement('#root'); // This helps with screen readers and accessibility.

export default function ModalAddAccount({ accounts, icons, activeSubTab, defaultCurrency}: ModalAddAccountProps) {
  return (
    <div></div>
  )
}
