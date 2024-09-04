// * Dependencies
import React from 'react';

// * Styling
import './Navbar.component.scss';

// * Interfaces
interface HeaderProps {
  activeTab: string;
}

export default function Header({ activeTab }: HeaderProps) {
  return (
    <header className="header">
      <h1>Header</h1>
    </header>
  );
}