// * Dependencies
import React from 'react';

// * Styling
import './Navbar.component.scss';

// * Interfaces
interface HeaderProps {
  activeTab: string;
  activeSubTab: { [key: string]: string };
  setActiveSubTab: (tab: string) => void;
}

export default function Header({ activeTab, activeSubTab, setActiveSubTab }: HeaderProps) {
  return (
    <header className="header">
      <h1>Header</h1>
      <p>activeTab: {activeTab}</p>
      <p>activeSubTab: {activeSubTab[activeTab]}</p>
    </header>
  );
}