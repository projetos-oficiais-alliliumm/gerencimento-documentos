import React from 'react';
import { RouterProvider } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import router from './Routes';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router}/>
      <Footer /> 
    </>
  );
}

export default App;
