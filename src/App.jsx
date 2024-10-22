/* import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Hero from "./components/hero.jsx";
import Gradesite from "./components/gradesite.jsx";
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
          <Route path="/gradesite" element={<Gradesite />} /> 
          <Route path="/categories" element={<Categories />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

 */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx"; // Ensure the casing is consistent
import Gradesite from "./components/Gradesite.jsx";
import Categories from "./components/categories.jsx"; // Ensure the casing is consistent
import RecipeDetails from './components/RecipeDetails.jsx'; // Ensure the casing is consistent

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="App">
        <Header onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Categories/>
              <Recipes searchQuery={searchQuery} />
            </>
          } />
          <Route path="/gradesite" element={<Gradesite />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;