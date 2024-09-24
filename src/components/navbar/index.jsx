import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Navbar() {
  // Access the global context to get search parameters and handler functions
  const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);

  // Log the current search parameter for debugging
  console.log(searchParam);

  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
      {/* Site title with a link to the home page */}
      <h2 className="text-2xl font-semibold">
        <NavLink to={"/"}>Dish Delights</NavLink>
      </h2>
      
      {/* Form for searching items */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={searchParam} // Controlled input, value comes from state
          onChange={(event) => setSearchParam(event.target.value)} // Update search parameter on input change
          placeholder="Enter Items..."
          className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200" // Tailwind CSS classes for styling
        />
      </form>
      
      {/* Navigation links */}
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-black hover:text-gray-700 duration-300" // Tailwind CSS classes for link styling
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favorites"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
