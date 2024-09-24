import { useContext } from "react";
import { GlobalContext } from "../../context"; // Import the global context
import RecipeItem from "../../components/recipe-item"; // Import the RecipeItem component

// Home component to display the list of recipes
export default function Home() {
  const { recipeList, loading } = useContext(GlobalContext); // Access recipe list and loading status from the global context

  // Display a loading message while data is being fetched
  if (loading) return <div>Loading...Please wait!</div>;

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? ( // Check if there are recipes available
        recipeList.map((item) => (
          <RecipeItem key={item.id} item={item} /> // Render RecipeItem for each recipe in the list
        ))
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing to show!! Please search something {/* Message to show if no recipes are found */}
          </p>
        </div>
      )}
    </div>
  );
}
