// * Dependencies
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Papa from 'papaparse';
import { Account } from './types';
import { Icon } from './types';

// * Components
import Navbar from './sections/Navbar.component';
import Header from './sections/Header.component';
import PageAccounts from './pages/PageAccounts.component';
import PageCategories from './pages/PageCategories.component';
import PageTransactions from './pages/PageTransactions.component';

// * Styling
import './styles/App.scss';

export default function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [icons, setIcons] = useState<Icon[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [activeSubTab, setActiveSubTab] = useState({});
  const [defaultCurrency] = useState('PHP');

  const fetchAccountsCSVData = async () => {
    try {
      const response = await fetch('http://localhost:5000/account/');
      if (!response.ok) throw new Error('Failed to fetch accounts data');
      
      const accountsData = await response.json();
      setAccounts(accountsData); // Update the state with fetched data
    } catch (error) {
      console.error('Error fetching accounts data:', error);
    }
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

  const initializeActiveTabs = () => {
    const defaultActiveTab = '/accounts';
    const defaultActiveSubTab = {
      '/accounts': '/regular',
      '/categories': '/expense',
      '/transactions': '/daily',
    };

    setActiveTab(defaultActiveTab);
    setActiveSubTab(defaultActiveSubTab);
  }

  useEffect(() => {
    fetchAccountsCSVData();
    fetchIconsCSVData();
    initializeActiveTabs();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header 
          activeTab={activeTab}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
        />
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/accounts" />} />
            <Route 
              path="/accounts"
              element={
                <PageAccounts 
                  accounts={accounts}
                  icons={icons}
                  activeSubTab={activeSubTab}
                  defaultCurrency={defaultCurrency}
                  setAccounts={setAccounts}
                />
              } 
            />
            <Route path="/categories" element={<PageCategories />} />
            <Route path="/transactions" element={<PageTransactions />} />
          </Routes>
        </main>
        <Navbar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </Router>
  );
}