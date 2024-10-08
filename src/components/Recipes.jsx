import React, { useState, useEffect } from "react";

export default function Recipes({ searchQuery }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://recept4-nupar.reky.se/recipes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setRecipes(data))
      .catch(error => console.error('Fetching misslyckades: ', error));
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.some(ingredient =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover mb-2 rounded" />
            <p className="text-gray-700 mb-2">{recipe.description}</p>
            <p className="text-gray-500">Time: {recipe.timeInMins} mins</p>
            <p className="text-gray-500">Price: {recipe.price} SEK</p>
          </div>
        ))}
      </div>
    </div>
  );
}