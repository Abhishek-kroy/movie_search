import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import About from './pages/About.js';

function App() {
  const [mode, setMode] = useState('light');  // Mode state (light or dark)
  
  return (
    <Routes>
      <Route path="/" element={<Home mode={mode} setMode={setMode} />} />
      <Route path="/about" element={<About mode={mode} setMode={setMode} />} />
    </Routes>
  );
}

export default App;