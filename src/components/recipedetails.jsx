import React, { useState, useEffect, useCallback, memo } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const {recipeId} = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://recept4-nupar.reky.se/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    showComments();
    fetchRecipe();
  }, [recipeId]);

  async function showComments() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`https://recept4-nupar.reky.se/recipes/${recipeId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const commentData = await response.json();
      setComments(commentData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const containsNumbers = /\d/;
    if (name.trim() === "" || commentText.trim() === "") {
      setValidationError("Både namn och kommentar måste fyllas i.");
      setSubmitMessage("");
      return;
    } else if (containsNumbers.test(name)) {
      setValidationError("Namnet får inte innehålla siffror.");
      setSubmitMessage("");
      return;
    }

    setValidationError(null);

    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      const response = await fetch(`https://recept4-nupar.reky.se/recipes/${recipeId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: commentText,
          name
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Misslyckades att skicka kommentar.");
      }

      setCommentText("");
      setName("");
      setSubmitMessage("Tack för din kommentar!");
      await showComments();
    } catch (error) {
      setValidationError("Något gick fel vid inskickning.");
      console.error("Fel vid inskickning:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="text-red-500 text-center p-4">
          Error: {error}
        </div>
    );
  }

  if (!recipe) {
    return <div className="text-center p-4">No recipe found.</div>;
  }

  return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row lg:justify-between mb-4 lg:space-x-4">
          {/* Textdelen */}
          <div className="lg:flex-1 lg:mt-12 bg-gray-200 dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <h1 className="text-4xl font-extrabold mb-4 dark:text-black">{recipe.title}</h1>
            <p className="text-gray-700 dark:text-gray-400 mb-4">{recipe.description}</p>
            <p className="text-xl font-semibold mb-4">Pris: {recipe.price} kronor</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Ingredienser</h3>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Gör så här</h3>
              <ol className="list-decimal list-inside">
                {recipe.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Bilddelen */}
          <div className="lg:flex-1 lg:pl-4">
            <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full max-h-full rounded shadow-lg object-cover"
                style={{ maxHeight: "100%" }}
            />
          </div>
        </div>

        {/* Kommentarsektionen */}
        <section className="lg:w-1/2 mt-8 mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-extrabold mb-6 text-center dark:text-black">Lämna kommentar</h2>
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Namn</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary-500"
                    placeholder="Skriv ditt namn..."
                    disabled={isSubmitting}
                    required
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kommentar</label>
                <textarea
                    id="comment"
                    rows="6"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary-500"
                    placeholder="Skriv en kommentar..."
                    disabled={isSubmitting}
                    required
                />
              </div>
            </div>
            {validationError && <p className="text-red-500 mb-4">{validationError}</p>}
            {submitMessage && <p className="text-green-500 mb-4">{submitMessage}</p>}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center py-3 px-6 text-sm font-semibold text-black bg-gray-300 rounded-lg shadow-lg hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} mt-4`}
            >
              {isSubmitting ? "Skickar..." : "Skicka kommentar"}
            </button>
          </form>

          {/* Visning av kommentarer */}
          <div className="comments-section space-y-4">
            <h2 className="text-lg font-bold mb-4">Kommentarer</h2>
            {comments.map((comment, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg space-y-2">
                  <div className="flex items-center mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{comment.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                </div>
            ))}
          </div>
        </section>
      </div>
  );

}

export default RecipeDetails;
