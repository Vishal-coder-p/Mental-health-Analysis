
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleLoginComponent from './components/login';
import DailyLog from './components/dailylog';
import Trends from './components/trends';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<GoogleLoginComponent />}  />
        <Route path="/daily-log" element={<DailyLog />} />
        <Route path="/trends" element={<Trends />} />
      </Routes>
    </Router>
  );
}

export default App;
