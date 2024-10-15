import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { recipeId } = useParams(); 
  const [recipe, setRecipe] = useState(null);

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
    <div className="container mx-auto p-4">
      {/* Flexbox for layout */}
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
        {/* Left side: Title, description, price, ingredients, and instructions */}
        <div className="lg:w-1/2 lg:mt-12 bg-gray-200 dark:bg-gray-900 p-6 rounded-lg shadow-lg"> {/* Bakgrundsruta och padding */}
          <h1 className="text-4xl font-extrabold mb-4 dark:text-black">{recipe.title}</h1>
          <p className="text-gray-700 dark:text-gray-400 mb-4">{recipe.description}</p>
          
          {/* Price */}
          <p className="text-xl font-semibold mb-4">Pris: {recipe.price} kronor</p>

          {/* Ingredients Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Ingredienser</h3>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Gör så här</h3>
            <ol className="list-decimal list-inside">
              {recipe.instructions.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="lg:w-1/2 lg:pl-4">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-auto rounded shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}


export default RecipeDetails;
