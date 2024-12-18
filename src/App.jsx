import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Categories from "./components/AsideCategories.jsx";
import RecipeDetails from './components/RecipeDetails.jsx';

function App() {

  return (

      <div className="App">
          <Router>
        <Header />
        <Routes>
          <Route path="/" element={<><Categories /> </>} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails/>} />
        </Routes>
          </Router>

      </div>
  );
}

export default App;