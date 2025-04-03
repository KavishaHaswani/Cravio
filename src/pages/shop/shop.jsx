import React from 'react';
import './shop.css';
import Header from '../../components/Header/header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Shop = () => {
  return (
    <div>
      <Header />
      <ExploreMenu />
      <FoodDisplay />
    </div>
  );
};

export default Shop;

