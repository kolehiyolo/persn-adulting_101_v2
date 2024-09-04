// * Dependencies
import React, { useState } from 'react';

// * Styling
import './Header.component.scss';

// * Interfaces
interface HeaderProps {
  activeTab: string;
  activeSubTab: { [key: string]: string };
  setActiveSubTab: (tab: { [key: string]: string }) => void;
}

interface HeaderTabsMenuProps extends HeaderProps {
  activeSubTabOptions: { [key: string]: string[] };
}

function HeaderTabsMenu({ activeTab, activeSubTab, setActiveSubTab, activeSubTabOptions}: HeaderTabsMenuProps) {
  const onSubTabClick = (subTab: string) => {
    const updatedActiveSubTab = { ...activeSubTab, [activeTab]: subTab };
    setActiveSubTab(updatedActiveSubTab);
  }

  return (
    <ul className="header-tabs-menu">
      {
        activeSubTabOptions && activeSubTabOptions[activeTab] &&
        activeSubTabOptions[activeTab].map(
          (subTab) => (
            <li 
              key={subTab} 
              className={
                [
                  `header-tabs-menu-item`,
                  activeSubTab[activeTab] === subTab ? 'active' : '',
                ].join(' ')
              }
            >
              <button onClick={() => onSubTabClick(subTab)}>
                {subTab.replace('/', '')}
              </button>
            </li>
          )
        )
      }
    </ul>
  );
}

function HeaderFilters() {
  return (
    <div className="header-filters">
      <div className="header-filters-left">
        <p>All accounts:</p>
        <p>PHP 12345678</p>
      </div>
      <div className="header-filters-right">
        <p>Thu, Aug 01, 2024</p>
        <p>Thu, Aug 01, 2024</p>
      </div>
    </div>
  );
}

export default function Header({ activeTab, activeSubTab, setActiveSubTab }: HeaderProps) {
  const [activeSubTabOptions] = useState({
    '/accounts': ['/regular', '/debts', '/funds'],
    '/categories': ['/expense', '/income'],
    '/transactions': ['/daily', '/weekly', '/monthly'],
  });

  return (
    <header className="header">
      <HeaderFilters />
      <HeaderTabsMenu 
        activeTab={activeTab} 
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        activeSubTabOptions={activeSubTabOptions}
      />
    </header>
  );
}