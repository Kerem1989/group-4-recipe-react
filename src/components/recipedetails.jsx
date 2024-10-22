import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    // Fetch recipe
    fetch(`https://recept4-nupar.reky.se/recipes/${recipeId}`)
        .then(response => response.json())
        .then(data => setRecipe(data))
        .catch(error => console.error('Error fetching recipe:', error));

    // Fetch comments
    fetchComments();
  }, [recipeId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Anpassa denna URL till din API-endpoint för kommentarer
      const response = await fetch(`https://recept4-nupar.reky.se/recipes/${recipeId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const CommentDropdown = ({ id }) => (
      <div className="relative">
        <button
            onClick={() => setActiveDropdown(activeDropdown === id ? null : id)}
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
          </svg>
          <span className="sr-only">Kommentarinställningar</span>
        </button>
        {activeDropdown === id && (
            <div className="absolute right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Redigera</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ta bort</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Rapportera</a></li>
              </ul>
            </div>
        )}
      </div>
  );

  const Comment = ({ comment }) => (
      <article className={`p-6 text-base bg-white rounded-lg dark:bg-gray-900 ${comment.isReply ? 'mb-3 ml-6 lg:ml-12' : ''} ${!comment.isReply ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}>
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              <img className="mr-2 w-6 h-6 rounded-full" src={comment.avatar || "/default-avatar.png"} alt={comment.author} />
              {comment.author}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate datetime={comment.datetime} title={comment.date}>
                {comment.date}
              </time>
            </p>
          </div>
          <CommentDropdown id={comment.id} />
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
        <div className="flex items-center mt-4 space-x-4">
          <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
            <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
            </svg>
            Svara
          </button>
        </div>
      </article>
  );

  if (!recipe) {
    return <div>Laddar...</div>;
  }

  return (
      <div className="container mx-auto p-4">
        {/* Recipe Details Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
          <div className="lg:w-1/2 lg:mt-12 bg-gray-200 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
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

          <div className="lg:w-1/2 lg:pl-4">
            <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-auto rounded shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Comments Section */}
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Kommentarer ({comments.length})
              </h2>
            </div>

            <form className="mb-6">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">Din kommentar</label>
                <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Skriv en kommentar..."
                    required
                />
              </div>
              <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Posta kommentar
              </button>
            </form>

            {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                      <div key={i} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                  ))}
                </div>
            ) : error ? (
                <div className="text-center py-6">
                  <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>
                  <button
                      onClick={fetchComments}
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Försök igen
                  </button>
                </div>
            ) : (
                comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))
            )}
          </div>
        </section>
      </div>
  );
}

export default RecipeDetails;