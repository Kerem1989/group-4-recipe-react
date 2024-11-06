// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from "./Hero.jsx";

const DropDownList = ({ label, options, selectedOptions, handleOptionClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 relative w-full">
            <button
                className="w-full p-2 text-left text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{label}: {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Välj"}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none"
                     stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
            </button>
            {isOpen && (
                <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-left"
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


const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [timeOptions, setTimeOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    const getDifficulty = (timeInMins) => {
        if (timeInMins < 20) {
            return "Lätt";
        } else if (timeInMins <= 30) {
            return "Medel";
        } else {
            return "Svårt";
        }
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
        <>
            <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 relative">
                {/* Overlay for mobile sidebar */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Container to align button with main content */}
                <div className="flex flex-col">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="inline-flex items-center p-2 mt-4 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-50"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 h-full z-50 bg-gray-50 dark:bg-gray-800 w-64 p-4 transition-transform ${
                        sidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
                    } sm:static sm:transform-none`}
                    aria-label="Sidebar"
                >
                    <div className="h-auto">
                        <DropDownList
                            label="Kategorier"
                            options={categories}
                            selectedOptions={selectedCategories}
                            handleOptionClick={handleCategoryClick}
                        />
                        <DropDownList
                            label="Tillagningstid"
                            options={timeOptions}
                            selectedOptions={selectedTimes}
                            handleOptionClick={handleTimeClick}
                        />
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-4 overflow-hidden">
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
                                    <p className="text-gray-700 mb-2 dark:text-gray-300">
                                        {recipe.description
                                            ? recipe.description.split('.')[0] + '.'
                                            : ''}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">Tillagningstid: {recipe.timeInMins} mins</p>
                                    <p className="text-gray-500 dark:text-gray-400">Pris: {recipe.price} SEK</p>
                                    <p className="text-gray-500 dark:text-gray-400">Svårighetsgrad: {getDifficulty(recipe.timeInMins)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DashboardLayout;
