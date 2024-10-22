import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DropDownList = ({ label, options, selectedOptions, handleOptionClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 relative w-full">
      <button 
        className="w-full p-2 text-left text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}: {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select"}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly
                className="rounded dark:bg-gray-700"
              />
              <span className={selectedOptions.includes(option) ? 'font-bold' : ''}>
                {option}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DashboardLayout = ({ searchQuery: externalSearchQuery }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');

  // Use external searchQuery if provided, otherwise use internal
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;

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

  const handleCategoryClick = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleTimeClick = (time) => {
    setSelectedTimes(prev => 
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategories.length === 0 || 
      recipe.categories.some(category => selectedCategories.includes(category));
    const matchesTime = selectedTimes.length === 0 || 
      selectedTimes.includes(recipe.timeInMins);
    const matchesSearchQuery = !searchQuery || 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.ingredients && recipe.ingredients.some(ingredient => 
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    return matchesCategory && matchesTime && matchesSearchQuery;
  });

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`relative w-64 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/* Only show search input if no external searchQuery is provided */}
          {externalSearchQuery === undefined && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={internalSearchQuery}
                onChange={(e) => setInternalSearchQuery(e.target.value)}
              />
            </div>
          )}

          {/* Filter dropdowns */}
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
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe, index) => (
              <Link 
                to={`/recipe/${recipe._id}`} 
                key={index} 
                className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-200"
              >
                <h2 className="text-2xl font-semibold mb-2 dark:text-white">{recipe.title}</h2>
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <p className="text-gray-700 mb-2 dark:text-gray-300">{recipe.description}</p>
                <p className="text-gray-500 dark:text-gray-400">Time: {recipe.timeInMins} mins</p>
                <p className="text-gray-500 dark:text-gray-400">Price: {recipe.price} SEK</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;