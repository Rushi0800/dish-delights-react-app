import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create a context for global state management
export const GlobalContext = createContext(null);

// GlobalState component that provides state and functions to its children
export default function GlobalState({ children }) {
  // State variables for search parameters, loading status, recipe list, recipe details, and favorites
  const [searchParam, setSearchParam] = useState(""); // Holds the current search parameter
  const [loading, setLoading] = useState(false); // Indicates loading status
  const [recipeList, setRecipeList] = useState([]); // Holds the list of recipes fetched
  const [recipeDetailsData, setRecipeDetailsData] = useState(null); // Holds details of a selected recipe
  const [favoritesList, setFavoritesList] = useState([]); // Holds the list of favorite recipes

  const navigate = useNavigate(); // Hook for navigation

  // Function to handle form submission and fetch recipes based on search parameter
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      // Fetch recipes from the API based on the search parameter
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json(); // Parse the JSON response
      // Check if recipes are available in the response data
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes); // Update the recipe list state
        setLoading(false); // Set loading to false
        setSearchParam(""); // Clear the search parameter
        navigate('/'); // Navigate to the home page
      }
    } catch (e) {
      console.log(e); // Log any errors that occur
      setLoading(false); // Set loading to false on error
      setSearchParam(""); // Clear the search parameter on error
    }
  }

  // Function to add or remove a recipe from favorites
  function handleAddToFavorite(getCurrentItem) {
    console.log(getCurrentItem); // Log the current item being added/removed
    let cpyFavoritesList = [...favoritesList]; // Create a copy of the favorites list
    const index = cpyFavoritesList.findIndex(item => item.id === getCurrentItem.id); // Find the index of the current item

    if (index === -1) {
      // If the item is not already in favorites, add it
      cpyFavoritesList.push(getCurrentItem);
    } else {
      // If it is already in favorites, remove it
      cpyFavoritesList.splice(index, 1); // Corrected to remove the item at the found index
    }

    setFavoritesList(cpyFavoritesList); // Update the favorites list state
  }

  console.log(favoritesList, 'favoritesList'); // Log the current favorites list

  return (
    // Provide the global state and functions to the context consumers
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList
      }}
    >
      {children} {/* Render children components */}
    </GlobalContext.Provider>
  );
}
