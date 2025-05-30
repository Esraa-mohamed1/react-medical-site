

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorPage from './pages/DoctorPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/doctor/:id" element={<DoctorPage />} />
          <Route path="/" element={<DoctorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;