import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Likes from './pages/Likes';
// import http from './axios';
import MainLayout from './layout/MainLayout';

function App() {

  // useEffect(() => {
  //   http.get('featured-playlists')
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // });

  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLayout><Home /></MainLayout>}></Route>
        <Route path='/likes' element={<MainLayout><Likes /></MainLayout>}></Route>
        <Route path='/playlist/:id' element={<MainLayout><Details></Details></MainLayout>}></Route>
      </Routes>
    </div>
  );
}

export default App;