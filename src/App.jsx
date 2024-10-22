import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Hero from "./components/hero.jsx";
import Categories from "./components/asidecategories.jsx";
import RecipeDetails from './components/recipedetails.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="App">
        <Header onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={<><Hero /><Categories /></>} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;