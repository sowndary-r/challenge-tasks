import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './components/userLogin';
import Challengers from './components/challengers';
import Challenges from './components/challenges';
import UploadVideos  from './components/videos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/challengers" element={<Challengers />} />
        <Route path="/" element={<UserLogin />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/uploadVideos" element={<UploadVideos />} />
      </Routes>
    </Router>
  );
}

export default App;
