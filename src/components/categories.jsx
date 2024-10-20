/* import React, { useState, useEffect } from "react";

function DropDownList({ label, options, selectedOptions, handleOptionClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {label}: {selectedOptions.length > 0 ? <strong>{selectedOptions.join(", ")}</strong> : "Select"}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{ fontWeight: selectedOptions.includes(option) ? 'bold' : 'normal' }}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Categories() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);

  // Fetch the recipes data from the JSON file
  useEffect(() => {
    fetch('/assets/recipes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRecipes(data);
        const allCategories = new Set(data.flatMap(recipe => recipe.categories));
        setCategories([...allCategories]);
        const allTimes = new Set(data.map(recipe => recipe.timeInMins));
        setTimeOptions([...allTimes].sort((a, b) => a - b));
        const allPrices = new Set(data.map(recipe => recipe.price));
        setPriceOptions([...allPrices].sort((a, b) => a - b));
      })
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

  // Handle time selection
  const handleTimeClick = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  // Handle price selection
  const handlePriceClick = (price) => {
    if (selectedPrices.includes(price)) {
      setSelectedPrices(selectedPrices.filter(p => p !== price));
    } else {
      setSelectedPrices([...selectedPrices, price]);
    }
  };

  // Filter recipes based on selected categories, times, and prices
  const filteredRecipes = recipes.filter(recipe =>
    (selectedCategories.length === 0 || recipe.categories.some(cat => selectedCategories.includes(cat))) &&
    (selectedTimes.length === 0 || selectedTimes.includes(recipe.timeInMins)) &&
    (selectedPrices.length === 0 || selectedPrices.includes(recipe.price))
  );

  return (
    <div>
      <div className="flex space-x-4">
        <DropDownList
          label="Categories"
          options={categories}
          selectedOptions={selectedCategories}
          handleOptionClick={handleCategoryClick}
        />
        <DropDownList
          label="Cooking Time"
          options={timeOptions}
          selectedOptions={selectedTimes}
          handleOptionClick={handleTimeClick}
        />
        <DropDownList
          label="Price"
          options={priceOptions}
          selectedOptions={selectedPrices}
          handleOptionClick={handlePriceClick}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredRecipes.map((recipe, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <p className="text-gray-700 mb-2">{recipe.description}</p>
            <p className="text-gray-500">Time: {recipe.timeInMins} mins</p>
            <p className="text-gray-500">Price: {recipe.price} SEK</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories; */

import React, { useState, useEffect } from "react";

export function DropDownList({ label, options, selectedOptions, handleOptionClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {label}: {selectedOptions.length > 0 ? <strong>{selectedOptions.join(", ")}</strong> : "Select"}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{ fontWeight: selectedOptions.includes(option) ? 'bold' : 'normal' }}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Categories() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the recipes data from the JSON file
  useEffect(() => {
    fetch('/assets/recipes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRecipes(data);
        const allCategories = new Set(data.flatMap(recipe => recipe.categories));
        setCategories([...allCategories]);
        const allTimes = new Set(data.map(recipe => recipe.timeInMins));
        setTimeOptions([...allTimes].sort((a, b) => a - b));
        const allPrices = new Set(data.map(recipe => recipe.price));
        setPriceOptions([...allPrices].sort((a, b) => a - b));
      })
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

  // Handle time selection
  const handleTimeClick = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  // Handle price selection
  const handlePriceClick = (price) => {
    if (selectedPrices.includes(price)) {
      setSelectedPrices(selectedPrices.filter(p => p !== price));
    } else {
      setSelectedPrices([...selectedPrices, price]);
    }
  };

  // Filter recipes based on selected categories, times, prices, and search query
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(category => recipe.categories.includes(category));
    const matchesTime = selectedTimes.length === 0 || selectedTimes.includes(recipe.timeInMins);
    const matchesPrice = selectedPrices.length === 0 || selectedPrices.includes(recipe.price);
    const matchesSearchQuery = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesTime && matchesPrice && matchesSearchQuery;
  });

  return (
    <div>
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="mb-4 p-2 border border-gray-200 rounded-lg"
        />
        <DropDownList
          label="Categories"
          options={categories}
          selectedOptions={selectedCategories}
          handleOptionClick={handleCategoryClick}
        />
        <DropDownList
          label="Cooking Time"
          options={timeOptions}
          selectedOptions={selectedTimes}
          handleOptionClick={handleTimeClick}
        />
        <DropDownList
          label="Price"
          options={priceOptions}
          selectedOptions={selectedPrices}
          handleOptionClick={handlePriceClick}
        />
      </div>
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
    </div>
  );
}

export default Categories;


