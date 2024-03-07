import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ForecastPage from './components/ForecastPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forecast" element={<ForecastPage />} />
      </Routes>
    </Router>
  );
}

export default App;
