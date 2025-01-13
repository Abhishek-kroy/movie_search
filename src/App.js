import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Favorite from './pages/Favorite.js';

function App() {
  const [mode, setMode] = useState('light');  // Mode state (light or dark)
  
  return (
    <div>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home mode={mode} setMode={setMode} />} />
        <Route path="/about" element={<About mode={mode} setMode={setMode} />} />
        <Route path="/favorites" element={<Favorite mode={mode} setMode={setMode} />} />
      </Routes>
    </div>
  );
}

export default App;