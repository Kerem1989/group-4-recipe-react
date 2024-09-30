import { useState } from 'react'
import React from 'react';
import Header from './header';
import Recipes from "./components/Recipes.jsx";


function App() {
    return (
        <div className="App">
            <Header />
            <Recipes />
        </div>
    );
}

export default App;
