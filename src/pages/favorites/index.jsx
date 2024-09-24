import { useContext } from "react";
import RecipeItem from "../../components/recipe-item"; // Import the RecipeItem component
import { GlobalContext } from "../../context"; // Import the global context

// Favorites component to display the list of favorite recipes
export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext); // Access favorites list from the global context

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? ( // Check if there are favorite items
        favoritesList.map((item) => <RecipeItem key={item.id} item={item} />) // Map over the favorites and render RecipeItem for each
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing is added in favorites. {/* Message to show if no favorites are present */}
          </p>
        </div>
      )}
    </div>
  );
}
