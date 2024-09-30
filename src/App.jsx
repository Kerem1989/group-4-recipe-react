import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes.jsx";
import Header from "./components/header.jsx"; 
import Hero from "./components/hero.jsx";
import Gradesite from "./components/gradesite.jsx"; 
import Categories from "./components/categories.jsx"; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<><Hero /><Recipes /></>} /> 
          <Route path="/gradesite" element={<Gradesite />} /> 
          <Route path="/categories" element={<Categories />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
