// App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Likes from './pages/Likes';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLayout><Home /></MainLayout>}></Route>
        <Route path='/likes' element={<MainLayout><Likes /></MainLayout>}></Route>
        <Route path='/playlist/:id' element={<MainLayout><Details /></MainLayout>}></Route>
      </Routes>
    </div>
  );
}

export default App;
