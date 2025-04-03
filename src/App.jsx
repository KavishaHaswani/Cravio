import React from 'react';
import Navbar from './components/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import Shop from './pages/shop/shop';
import Cart from './pages/cart/cart';
import PlaceOrder from './pages/placeOrder/placeOrder';
import Header from './components/Header/header';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
      </Routes>
    </div>
  );
}

export default App;

