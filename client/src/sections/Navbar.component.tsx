// * Dependencies
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// * Styling
import './Navbar.component.scss';

export default function Navbar() {
  const location = useLocation();  // To get the current route
  const [activeTab, setActiveTab] = useState(location.pathname);

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