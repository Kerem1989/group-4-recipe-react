import { useState } from 'react'
import viteLogo from '/vite.svg'
import React from 'react';
import Header from './header'; // Adjust the path according to your file structure
import List from './list'; // Adjust the path according to your file structure

function App() {
  return (
    <div className="App">
      <Header />
      {/* Other components */}
      <List />
    </div>
  );
}

export default App;
