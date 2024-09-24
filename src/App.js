import logo from "./logo.svg"; // Import logo (not used in this example)
import "./App.css"; // Import CSS styles
import { Routes, Route } from "react-router-dom"; // Import routing components from react-router-dom
import Navbar from "./components/navbar"; // Import the Navbar component
import Home from "./pages/home"; // Import the Home page component
import Favorites from "./pages/favorites"; // Import the Favorites page component
import Details from "./pages/details"; // Import the Recipe Details page component

function App() {
  return (
    <div>
      {/* Main container with styling */}
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
        <Navbar /> {/* Render the Navbar component */}
        
        {/* Define routes for the application */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/favorites" element={<Favorites />} /> {/* Favorites route */}
          <Route path="/recipe-item/:id" element={<Details />} /> {/* Recipe Details route with dynamic id */}
        </Routes>
      </div>
    </div>
  );
}

export default App; // Export the App component
