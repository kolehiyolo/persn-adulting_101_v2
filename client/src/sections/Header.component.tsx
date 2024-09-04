// * Dependencies
import React, { useState } from 'react';

// * Styling
import './Navbar.component.scss';

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
    <ul>
      {
        activeSubTabOptions && activeSubTabOptions[activeTab] &&
        activeSubTabOptions[activeTab].map(
          (subTab) => (
            <li 
              key={subTab} 
              className={activeSubTab[activeTab] === subTab ? 'active' : ''}
            >
              <button onClick={() => onSubTabClick(subTab)}>
                {subTab}
              </button>
            </li>
          )
        )
      }
    </ul>
  );
}

export default function Header({ activeTab, activeSubTab, setActiveSubTab }: HeaderProps) {
  const [activeSubTabOptions, setActiveSubTabOptions] = useState({
    '/accounts': ['/regular', '/debts', '/funds'],
    '/categories': ['/expense', '/income'],
    '/transactions': ['/daily', '/weekly', '/monthly'],
  });

  return (
    <header className="header">
      <h1>Header</h1>
      <p>activeTab: {activeTab}</p>
      <p>activeSubTab: {activeSubTab[activeTab]}</p>
      <HeaderTabsMenu 
        activeTab={activeTab} 
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        activeSubTabOptions={activeSubTabOptions}
      />
    </header>
  );
}