import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/homePage" element={<HomePage />}/>
        <Route  path="/" element={<LoginPage />}/>
        <Route  path="/register" element={<RegisterPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
