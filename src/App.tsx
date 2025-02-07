import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect hooks
import Navbar from "./components/Navbar"; // Import the Navbar component
import { FlightSearch } from "./components/FlightSearch"; // Import the FlightSearch component
import './App.css'; // Import the App's CSS file

// Define the App component (main application component)
function App() {
  // State for the current theme (light or dark), initialized from localStorage or defaulting to "light"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // useEffect hook to manage theme changes and persist them to localStorage
  useEffect(() => {
    // Add the "dark" class to the document's HTML element if the theme is "dark"
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      // Remove the "dark" class if the theme is "light"
      document.documentElement.classList.remove("dark");
    }
    // Store the current theme in localStorage whenever the theme changes
    localStorage.setItem("theme", theme);
  }, [theme]); // The effect runs only when the 'theme' state changes

  // Determine the correct image source based on the current theme
  const imageSrc =
    theme === "dark"
      ? "https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg" // Dark theme image
      : "https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"; // Light theme image

  // JSX structure for the App component
  return (
    <> {/* Fragment to wrap multiple JSX elements */}
      <Navbar setTheme={setTheme} theme={theme} /> {/* Render the Navbar component, passing the theme and setTheme as props */}
      <div className="App min-h-screen"> {/* Main application content container, ensuring minimum screen height */}
        <div className="image-container flex flex-col items-center"> {/* Container for the hero image and title */}
          <img src={imageSrc} alt="Flights" className="w-96" /> {/* Render the hero image, with width set to 96 units */}
          <h1 className="text-overlay semi-bold text-black dark:text-white"> {/* Title overlaying the image */}
            Flights
          </h1>
        </div>
        <FlightSearch /> {/* Render the FlightSearch component */}
      </div>
    </>
  );
}

export default App; 