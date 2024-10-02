import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/hero.jsx";
import Gradesite from "./components/gradesite.jsx";
import Categories from "./components/categories.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="App">
        <Header onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={<><Hero /><Recipes searchQuery={searchQuery} /></>} />
          <Route path="/gradesite" element={<Gradesite />} /> 
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
