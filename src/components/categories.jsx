/* import React, { useState, useEffect } from "react";

function DropDownList({ label, options, selectedOption, handleOptionClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {label}: {selectedOption || "Select"}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
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
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeOptions, setTimeOptions] = useState([]);

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
    setSelectedTime(time);
  };

  // Filter recipes based on selected categories and time
  const filteredRecipes = recipes.filter(recipe =>
    (selectedCategories.length === 0 || recipe.categories.some(cat => selectedCategories.includes(cat))) &&
    (selectedTime === null || recipe.timeInMins === selectedTime)
  );

  return (
    <div>
      <div className="flex space-x-4">
        <DropDownList
          label="Categories"
          options={categories}
          selectedOption={selectedCategories.join(", ")}
          handleOptionClick={handleCategoryClick}
        />
        <DropDownList
          label="Cooking Time"
          options={timeOptions}
          selectedOption={selectedTime}
          handleOptionClick={handleTimeClick}
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

function DropDownList({ label, options, selectedOptions, handleOptionClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {label}: {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select"}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
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

  // Fetch the recipes data from the JSON file
  useEffect(() => {
    fetch('https://recept4-nupar.reky.se/recipes')
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

  // Filter recipes based on selected categories and times
  const filteredRecipes = recipes.filter(recipe =>
    (selectedCategories.length === 0 || recipe.categories.some(cat => selectedCategories.includes(cat))) &&
    (selectedTimes.length === 0 || selectedTimes.includes(recipe.timeInMins))
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

export default Categories;