// * Dependencies
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Papa from 'papaparse';
import { Account } from './types';
import { Icon } from './types';

// * Components
import Navbar from './sections/Navbar.component';
import PageAccounts from './pages/PageAccounts.component';
import PageCategories from './pages/PageCategories.component';
import PageTransactions from './pages/PageTransactions.component';

// * Styling
import './styles/App.scss';

export default function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [icons, setIcons] = useState<Icon[]>([]);

  const fetchAccountsCSVData = async () => {
    const response = await fetch('/data/sample/accounts.csv');
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
    const accountsData = parsedData.data as Account[];

    setAccounts(accountsData);
  };

  const fetchIconsCSVData = async () => {
    const response = await fetch('/data/sample/icons.csv');
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
    const iconsData = parsedData.data as Icon[];

    setIcons(iconsData);
  };

  useEffect(() => {
    fetchAccountsCSVData();
    fetchIconsCSVData();
  }, []);

  return (
    <Router>
      <div className="App">
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/accounts" />} />
            <Route 
              path="/accounts"
              element={
                <PageAccounts 
                  accounts={accounts}
                  icons={icons}
                />
              } 
            />
            <Route path="/categories" element={<PageCategories />} />
            <Route path="/transactions" element={<PageTransactions />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}