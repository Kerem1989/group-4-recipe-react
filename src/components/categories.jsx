/* import React from "react";

function Categories() {
  return (
    <div className="categories">
      <h1>Kategorier</h1>
      <p>Utforska våra olika kategorier av recept!</p>
      <ul>
        <li>Förrätter</li>
        <li>Huvudrätter</li>
        <li>Desserter</li>
        <li>Snacks</li>
      </ul>
    </div>
  );
}

export default Categories; */

/* import React from "react";

function Categories() {
  return (
    <div className="categories p-4">
      <h1 className="text-4xl font-bold text-center">Kategorier</h1>
      <p className="text-center mt-4">Utforska våra olika kategorier av recept!</p>
      <ul className="list-disc list-inside mt-4">
        <li>Förrätter</li>
        <li>Huvudrätter</li>
        <li>..</li>
        <li>..</li>
      </ul>
      <ul className="list-disc list-inside mt-4">
        <li>Kött</li>
        <li>Fisk och Skaldjur</li>
        <li>Vegetariskt</li>
        <li>Veganskt</li>
        <li>Glutenfritt</li>
      </ul>
      <ul className="list-disc list-inside mt-4">
        <li>Husmanskost</li>
        <li>Internationellt</li>
      </ul>
      <ul className="list-disc list-inside mt-4">
        <li>15 min</li>
        <li>30 min</li>
        <li>45 min</li>
        <li>60 min</li>
        <li>90 min</li>
        <li>120 min</li>
      </ul>
      <ul className="list-disc list-inside mt-4">
        <li>50 SEK</li>
        <li>100 SEK</li>
        <li>150 SEK</li>
        <li>200 SEK</li>
      </ul>
    </div>
  );
}

export default Categories;
 */

import React, { useState, useEffect } from "react";

function Categories() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch the recipes data from the JSON file
  useEffect(() => {
    fetch('/assets/recipes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setRecipes(data))
      .catch(error => console.error('Fetching failed: ', error));
  }, []);

  // Handle category selection
  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter recipes based on selected categories
  const filteredRecipes = recipes.filter(recipe =>
    selectedCategories.length === 0 || 
    recipe.categories.some(cat => selectedCategories.includes(cat))
  );

  const categories = [
    "Förrätt", "Huvudrätt", "Kött", "Fisk och Skaldjur", 
    "Vegetariskt", "Veganskt", "Glutenfritt", "Husmanskost"
  ];

  return (
    <div className="categories p-4">
      <h1 className="text-4xl font-bold text-center">Kategorier</h1>
      <p className="text-center mt-4">Utforska våra olika kategorier av recept!</p>

      {/* Render the category list */}
      <ul className="list-disc list-inside mt-4 flex flex-wrap">
        {categories.map((category) => (
          <li 
            key={category}
            className={`cursor-pointer p-2 m-2 border ${selectedCategories.includes(category) ? 'bg-gray-300' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>

      {/* Render the filtered recipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredRecipes.map((recipe, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
            <img src={recipe.imageUrl} alt={recipe.title}
              className="w-full h-48 object-cover mb-2 rounded" />
            <p className="text-gray-700 mb-2">{recipe.description}</p>
            <p className="text-gray-500">Time: {recipe.timeInMins} mins</p>
            <p className="text-gray-500">Price: {recipe.price} SEK</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;