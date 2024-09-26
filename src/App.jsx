import { useState } from 'react'
import React from 'react';
import Header from './header'; 
import ProductList from './products'; 

function App() {
  return (
    <div className="App">
      <Header />
      <ProductList />
    </div>
  );
}

export default App;
