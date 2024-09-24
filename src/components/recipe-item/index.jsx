import { Link } from "react-router-dom";

export default function RecipeItem({ item }) {
  return (
    // Main container for the recipe item
    <div className="flex flex-col w-80 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white">
      {/* Image section with a fixed height */}
      <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
        <img src={item?.image_url} alt="recipe item" className="block w-full" />
      </div>
      
      {/* Details about the recipe */}
      <div>
        {/* Publisher information */}
        <span className="text-sm text-cyan-700 font-medium">
          {item?.publisher}
        </span>
        
        {/* Recipe title */}
        <h3 className="font-bold text-2xl truncate text-black">
          {item?.title}
        </h3>
        
        {/* Link to recipe details page */}
        <Link
          to={`/recipe-item/${item?.id}`} // Dynamic route for recipe details
          className="text-sm p-3 mt-5 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white"
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
}
