import React, { useState, useEffect, useCallback, memo } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { recipeId } = useParams();
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
    showComments()
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

    if (name.trim() === "" || commentText.trim() === "") {
      setValidationError("Både namn och kommentar måste fyllas i.");
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
          comment: commentText,  // Changed from content to comment
          name                  // This is correct as is
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const CommentDropdown = memo(({ id }) => (
      <div className="relative">
        <button
            onClick={() => setActiveDropdown(activeDropdown === id ? null : id)}
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
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
  ));

  const Comment = memo(({ comment }) => (
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
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
            </svg>
            Svara
          </button>
        </div>
      </article>
  ));

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

        <section className="lg:w-1/2 mt-8 mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-extrabold mb-6 text-center dark:text-black">Kommentarer</h2>

          {/* Kommentarformulär */}
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Namn
                </label>
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
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Kommentar
                </label>
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
                aria-busy={isSubmitting}
                className={`inline-flex items-center py-3 px-6 text-sm font-semibold text-black bg-gray-300 rounded-lg shadow-lg hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} mt-4`}
            >
              {isSubmitting ? "Skickar..." : "Posta kommentar"}
            </button>
          </form>

          <div className="comments-section space-y-4"> {/* Added space between comments */}
            <h2 className="text-lg font-bold mb-4">Comments</h2>
            {comments.map((comment, index) => (
                <div key={index}
                     className="bg-white p-6 rounded-lg shadow-lg space-y-2"> {/* Rounded corners and shadow */}
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