import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

// Details component to display recipe information
export default function Details() {
  const { id } = useParams(); // Get the recipe ID from the URL parameters
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext); // Access global context values and functions

  // Effect to fetch recipe details when the component mounts
  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json(); // Parse the JSON response

      console.log(data); // Log the fetched data for debugging
      if (data?.data) {
        setRecipeDetailsData(data?.data); // Update the recipe details in the context
      }
    }

    getRecipeDetails(); // Call the function to fetch recipe details
  }, [id, setRecipeDetailsData]); // Dependency array to re-run effect if `id` changes

  console.log(recipeDetailsData, "recipeDetailsData"); // Log the current recipe details

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url} // Display recipe image
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher} // Display recipe publisher
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.recipe?.title} // Display recipe title
        </h3>
        <div>
          <button
            onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)} // Toggle favorite status
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            {favoritesList && favoritesList.length > 0 && favoritesList.findIndex(
              (item) => item.id === recipeDetailsData?.recipe?.id // Check if recipe is in favorites
            ) !== -1
              ? "Remove from favorites" // Show button text based on favorite status
              : "Add to favorites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.recipe?.ingredients.map((ingredient) => (
              <li key={ingredient.description}> {/* Add key for each ingredient */}
                <span className="text-2xl font-semibold text-black">
                  {ingredient.quantity} {ingredient.unit} {/* Display ingredient quantity and unit */}
                </span>
                <span className="text-2xl font-semibold text-black">
                  {ingredient.description} {/* Display ingredient description */}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
