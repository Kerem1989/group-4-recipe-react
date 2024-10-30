import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Categories from "./components/asidecategories.jsx";
import RecipeDetails from './components/recipedetails.jsx';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<><Categories /></>} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;