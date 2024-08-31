// * Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// * Components
import Navbar from './sections/Navbar.component';

// * Styling
import './styles/App.scss';

function Accounts() {
  return <div>Accounts Content</div>;
}

function Categories() {
  return <div>Categories Content</div>;
}

function Transactions() {
  return <div>Transactions Content</div>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/categories" />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;