import React, {useState, useEffect} from "react";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('/assets/recipes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setRecipes(data))
            .catch(error => console.error('Fetching misslyckades: ', error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Recipes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
                        <img src={recipe.imageUrl} alt={recipe.title}
                             className="w-full h-48 object-cover mb-2 rounded"/>
                        <p className="text-gray-700 mb-2">{recipe.description}</p>
                        <p className="text-gray-500">Time: {recipe.timeInMins} mins</p>
                        <p className="text-gray-500">Price: {recipe.price} SEK</p>
                    </div>
                ))}
            </div>
        </div>
    );
}