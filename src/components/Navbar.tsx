import { useState, useEffect } from "react"; 
import { Menu } from "lucide-react";

// Define the NavbarProps interface for type safety
interface NavbarProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>; // Function to set the theme (light or dark)
  theme: string; // Current theme (light or dark)
}

// Functional component for the navigation bar
const Navbar: React.FC<NavbarProps> = ({ setTheme, theme }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to track whether the theme dropdown is open

  // useEffect hook to handle theme changes
  useEffect(() => {
    // Remove existing theme classes from the document's HTML element
    document.documentElement.classList.remove("dark", "light");
    // Add the current theme class to the document's HTML element
    document.documentElement.classList.add(theme);
    // Store the current theme in local storage for persistence
    localStorage.setItem("theme", theme);
  }, [theme]); // This effect runs only when the 'theme' prop changes


  return (
    <nav className="z-10 h-16 px-2 md:px-5 py-3 shadow-sm shadow-gray-500 ">
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <div className="flex items-center gap-2 md:gap-5">
            <Menu
              color={theme === "light" ? "black" : "white"}
              className="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg focus:outline-offset-2"
            />
            <button
              aria-label="Google"
              className={`text-xl md:text-2xl mb-1 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              Google
            </button>
          </div>

          <div className="hidden md:flex items-center ml-4 lg:ml-10 gap-1 lg:gap-2 overflow-x-auto">
            {["Travel", "Explore", "Flights", "Hotels", "Holiday rentals"].map((item, index) => (
              <button
                key={index}
                className="flex items-center space-x-1 lg:space-x-2 rounded-full px-2 lg:px-4 py-1 lg:py-2 border border-gray-500 bg-transparent shadow-md text-gray-200 text-xs lg:text-sm font-semibold hover:bg-gray-800/20 transition whitespace-nowrap"
              >
                <svg
                  enable-background="new 0 0 24 24"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                  focusable="false"
                  className="HhI4X NMm5M"
                >
                  <rect fill="none" height="24" width="24"></rect>

                  <path fill={theme === "light" ? "#0060fa" : "#a8c7fa"} d={getIconPath(item)}></path>
                </svg>
                <span className={theme === "light" ? "text-black" : "text-white"}>{item}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Toggle Button and Dropdown */}
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
            <svg
              enable-background="new 0 0 24 24"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              focusable="false"
              className="VvN78c J66EYb NMm5M cursor-pointer"
            >
              <rect fill="none" height="24" width="24"></rect>
              <path
                fill={theme === "light" ? "black" : "white"}
                d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"
              ></path>
            </svg>
          </button>

          {dropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-32 rounded shadow-lg z-20 ${
                theme === "light"
                  ? "bg-white text-black border border-gray-300 shadow-md"
                  : "bg-customgray2 text-white"
              }`}
            >
              <button
                className={`w-full px-4 py-2 ${
                  theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"
                }`}
                onClick={() => setTheme("dark")}
              >
                Dark Theme
              </button>
              <button
                className={`w-full px-4 py-2 ${
                  theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"
                }`}
                onClick={() => setTheme("light")}
              >
                Light Theme
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Define a switch function to map svg buttons
const getIconPath = (item: string) => {
  switch (item) {
    case "Travel":
      return "M16.5,6H15l0-3.25C15,2.34,14.66,2,14.25,2h-4.5C9.34,2,9,2.34,9,2.75V6H7.5C6.67,6,6,6.67,6,7.5v11 C6,19.33,6.67,20,7.5,20v0.5C7.5,21.33,8.17,22,9,22s1.5-0.67,1.5-1.5V20h3v0.5c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5V20 c0.83,0,1.5-0.67,1.5-1.5v-11C18,6.67,17.33,6,16.5,6z M10.5,3.5h3V6h-3V3.5z M14.56,15.58c-0.62,0.57-1.47,0.91-2.48,0.91 c-1.46,0-2.73-0.84-3.35-2.07c-0.26-0.51-0.4-1.08-0.4-1.68c0-0.61,0.14-1.18,0.4-1.69c0.62-1.22,1.89-2.07,3.35-2.07 c0.99,0,1.84,0.36,2.48,0.95c0.01,0.01,0.01,0.04,0,0.05L13.54,11c-0.01,0.02-0.04,0.02-0.05,0c-0.39-0.35-0.87-0.53-1.41-0.53 c-0.98,0-1.8,0.66-2.1,1.55c-0.08,0.23-0.12,0.47-0.12,0.71c0,0.25,0.04,0.49,0.12,0.71c0.3,0.89,1.12,1.55,2.1,1.55 c0.5,0,0.93-0.13,1.27-0.36c0.38-0.25,0.64-0.63,0.73-1.08c0-0.02-0.01-0.05-0.04-0.05h-1.93c-0.02,0-0.04-0.02-0.04-0.04v-1.37 c0-0.02,0.02-0.04,0.04-0.04h3.46c0.02,0,0.03,0.01,0.04,0.03c0.04,0.23,0.06,0.48,0.06,0.73C15.68,13.97,15.27,14.93,14.56,15.58z"
    case "Explore":
      return "M19.3,16.9c0.4-0.7,0.7-1.5,0.7-2.4c0-2.5-2-4.5-4.5-4.5S11,12,11,14.5s2,4.5,4.5,4.5c0.9,0,1.7-0.3,2.4-0.7l3.2,3.2 l1.4-1.4L19.3,16.9z M15.5,17c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5S16.9,17,15.5,17z M12,20v2 C6.48,22,2,17.52,2,12C2,6.48,6.48,2,12,2c4.84,0,8.87,3.44,9.8,8h-2.07c-0.64-2.46-2.4-4.47-4.73-5.41V5c0,1.1-0.9,2-2,2h-2v2 c0,0.55-0.45,1-1,1H8v2h2v3H9l-4.79-4.79C4.08,10.79,4,11.38,4,12C4,16.41,7.59,20,12,20z"
    case "Flights":
      return "M3.29,6.56l1.41-1.41l9.55,2.47l3.89-3.89c0.59-0.59,1.53-0.59,2.12,0s0.59,1.53,0,2.12l-3.89,3.89l2.47,9.55l-1.41,1.41 l-4.24-7.78l-3.89,3.89l0.35,2.47L8.6,20.35l-1.77-3.18L3.65,15.4l1.06-1.06l2.47,0.35l3.89-3.89L3.29,6.56z"
    case "Hotels":
      return "M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm12-7h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"
    case "Holiday rentals":
      return "M19,9.3V4h-3v2.6L12,3L2,12h3v8h5v-6h4v6h5v-8h3L19,9.3z M10,10c0-1.1,0.9-2,2-2s2,0.9,2,2H10z"
    default:
      return ""
  }
}

export default Navbar;

