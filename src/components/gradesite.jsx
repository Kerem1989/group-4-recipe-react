/*
import React, { useState, useEffect } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [formState, setFormState] = useState({});
  const [comments, setComments] = useState({});
  const [formMessage, setFormMessage] = useState({});
  const [isSubmitting, setIsSubmitting] = useState({});
  const [showComments, setShowComments] = useState({}); 

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

  const handleInputChange = (recipeId, e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [recipeId]: {
        ...prev[recipeId],
        [name]: value,
      },
    }));
  };

  const handleCommentSubmit = (recipeId, e) => {
    e.preventDefault();
    const { name, comment } = formState[recipeId] || {};
  
    if (!name || !comment) {
      setFormMessage(prev => ({
        ...prev,
        [recipeId]: "Vänligen fyll i både namn och kommentar.",
      }));
      return;
    }
  
    setFormMessage(prev => ({ ...prev, [recipeId]: "" }));
    setIsSubmitting(prev => ({ ...prev, [recipeId]: true }));
  
    fetch(`/recipes/${recipeId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, comment }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit comment');
        }
        return response.json(); 
      })
      .then(newComment => {
        setComments(prev => ({
          ...prev,
          [recipeId]: prev[recipeId] ? [...prev[recipeId], newComment] : [newComment],
        }));
  
        setFormState(prev => ({
          ...prev,
          [recipeId]: { name: "", comment: "" },
        }));
        setIsSubmitting(prev => ({ ...prev, [recipeId]: false }));
        setFormMessage(prev => ({ ...prev, [recipeId]: "Tack för din kommentar!" }));
      })
      .catch(error => {
        console.error('Error:', error);
        setFormMessage(prev => ({ ...prev, [recipeId]: "Något gick fel. Försök igen." }));
        setIsSubmitting(prev => ({ ...prev, [recipeId]: false }));
      });
  };
  

  const toggleComments = (recipeId) => {
    if (!showComments[recipeId]) {
      fetch(`/recipes/${recipeId}/comments`)
        .then(response => response.json())
        .then(data => {
          setComments(prev => ({
            ...prev,
            [recipeId]: data,
          }));
        })
        .catch(error => console.error('Fetching comments failed: ', error));
    }
    
    setShowComments(prev => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <p className="text-gray-700 mb-2">{recipe.description}</p>
            <p className="text-gray-500">Tid: {recipe.timeInMins} minuter</p>
            <p className="text-gray-500">Pris: {recipe.price} SEK</p>

            {/* Comment Form *//*
            <h3 className="text-xl font-semibold mt-4">Lämna en kommentar</h3>
            {formMessage[recipe.id] && <p className="text-red-500">{formMessage[recipe.id]}</p>}
            <form onSubmit={(e) => handleCommentSubmit(recipe.id, e)}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={formState[recipe.id]?.name || ""}
                  onChange={(e) => handleInputChange(recipe.id, e)}
                  placeholder="Ditt namn"
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="comment"
                  value={formState[recipe.id]?.comment || ""}
                  onChange={(e) => handleInputChange(recipe.id, e)}
                  placeholder="Din kommentar"
                  className="border p-2 w-full"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
                disabled={isSubmitting[recipe.id]}>
                {isSubmitting[recipe.id] ? "Skickar..." : "Skicka"}
              </button>
            </form>

            {/* Visa kommentar-knapp *//*
            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
              onClick={() => toggleComments(recipe.id)}>
              {showComments[recipe.id] ? "Dölj kommentarer" : "Visa kommentarer"}
            </button>

            {/* V*isa tidigare kommentarer*//*
            {showComments[recipe.id] && (
              <>
                <h3 className="text-xl font-semibold mt-4">Tidigare Kommentarer</h3>
                <ul>
                  {comments[recipe.id]?.map((com, idx) => (
                    <li key={idx} className="border-t border-gray-300 pt-2 mt-2">
                      <p className="font-semibold">{com.name}</p>
                      <p>{com.comment}</p>
                      <p className="text-gray-500 text-sm">{com.date}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
*/