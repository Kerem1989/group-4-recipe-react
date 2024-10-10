import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { recipeId } = useParams(); // Hämta ID från URL:en
  const [recipe, setRecipe] = useState(null);

  // Hämta receptet från API:t baserat på recipeId
  useEffect(() => {
    fetch(`https://recept4-nupar.reky.se/recipes/${recipeId}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error('Error fetching recipe:', error));
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} />
      <p>{recipe.description}</p>
      <p>Time: {recipe.timeInMins} mins</p>
      <p>Price: {recipe.price} SEK</p>
      {/* Kommentarsfunktion? */}
    </div>
  );
}

export default RecipeDetails;
