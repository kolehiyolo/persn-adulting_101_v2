// * Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// * Styling
import './Navbar.component.scss';

// * Interfaces
interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({activeTab, setActiveTab}: NavbarProps) {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <nav className="nav">
      <ul>
        <li className={activeTab === '/accounts' ? 'active' : ''}>
          <Link to="/accounts" onClick={() => handleTabClick('/accounts')}>
            Accounts
          </Link>
        </li>
        <li className={activeTab === '/categories' ? 'active' : ''}>
          <Link to="/categories" onClick={() => handleTabClick('/categories')}>
            Categories
          </Link>
        </li>
        <li className={activeTab === '/transactions' ? 'active' : ''}>
          <Link to="/transactions" onClick={() => handleTabClick('/transactions')}>
            Transactions
          </Link>
        </li>
      </ul>
    </nav>
  );
}