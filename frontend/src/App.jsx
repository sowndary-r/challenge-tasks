import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './userLogin';
import Challengers from './challengers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/challengers" element={<Challengers />} />
        <Route path="/" element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
