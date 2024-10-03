import React, {useState, useEffect} from "react";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [comments, setComments] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState({});

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

    const handleCommentSubmit = (recipeId, e) => {
      e.preventDefault();
      if (!name || !comment) {
          setFormMessage(prev => ({ ...prev, [recipeId]: "Vänligen fyll i både namn och kommentar." }));
          return;
      }

      setIsSubmitting(true);
      setFormMessage(prev => ({ ...prev, [recipeId]: "" }));

      setTimeout(() => {
          const newComment = { name, comment, date: new Date().toLocaleString() };
          setComments(prev => ({
              ...prev,
              [recipeId]: prev[recipeId] ? [...prev[recipeId], newComment] : [newComment],
          }));
          setComment("");
          setName("");
          setIsSubmitting(false);
          setFormMessage(prev => ({ ...prev, [recipeId]: "Tack för din kommentar!" }));
      }, 1000);
  };
    
   
  return (
    <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
                    <img src={recipe.imageUrl} alt={recipe.title}
                         className="w-full h-48 object-cover mb-2 rounded"/>
                    <p className="text-gray-700 mb-2">{recipe.description}</p>
                    <p className="text-gray-500">Tid: {recipe.timeInMins} minuter</p>
                    <p className="text-gray-500">Pris: {recipe.price} SEK</p>

                    {/* Comment Form */}
                    <h3 className="text-xl font-semibold mt-4">Lämna en kommentar</h3>
                    {formMessage[recipe.id] && <p className="text-red-500">{formMessage[recipe.id]}</p>}
                    {!isSubmitting && formMessage[recipe.id] !== "Tack för din kommentar!" && (
                        <form onSubmit={(e) => handleCommentSubmit(recipe.id, e)}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ditt namn"
                                    className="border p-2 w-full"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Din kommentar"
                                    className="border p-2 w-full"
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                disabled={isSubmitting}>
                                Skicka
                            </button>
                        </form>
                    )}
                    {isSubmitting && <p>Skickar kommentar...</p>}
                    {formMessage[recipe.id] === "Tack för din kommentar!" && <p>{formMessage[recipe.id]}</p>}

                    {/* Display existing comments */}
                    <h3 className="text-xl font-semibold mt-4">Kommentarer</h3>
                    <ul>
                        {comments[recipe.id]?.map((com, idx) => (
                            <li key={idx} className="border-t border-gray-300 pt-2 mt-2">
                                <p className="font-semibold">{com.name}</p>
                                <p>{com.comment}</p>
                                <p className="text-gray-500 text-sm">{com.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
);
}