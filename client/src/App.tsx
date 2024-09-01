// * Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// * Components
import Navbar from './sections/Navbar.component';
import PageAccounts from './pages/PageAccounts.component';
import PageCategories from './pages/PageCategories.component';
import PageTransactions from './pages/PageTransactions.component';

// * Styling
import './styles/App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/accounts" />} />
            <Route path="/accounts" element={<PageAccounts />} />
            <Route path="/categories" element={<PageCategories />} />
            <Route path="/transactions" element={<PageTransactions />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;