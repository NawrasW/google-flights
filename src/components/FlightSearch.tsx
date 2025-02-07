import React, { useState } from "react"; 
import { fetchAirportDetails, fetchFlightsCompleteWithDynamicIds, Flight } from "../api/flightApi"; // Import API functions and Flight interface
import { Search, Calendar, RefreshCw, Users, ChevronDown } from "lucide-react"; // Import icons
import FlightResults from "./FlightResults"; // Import the FlightResults component

// Define the FlightSearch component
export function FlightSearch() {
  // State variables for managing the search form and results
  const [tripType, setTripType] = useState<"round-trip" | "one-way">("round-trip"); // State for trip type (round-trip or one-way)
  const [flights, setFlights] = useState<Flight[]>([]); // State for storing fetched flight data
  const [loading, setLoading] = useState<boolean>(false); // State to track loading status
  const [hasSearchedOnce, setHasSearchedOnce] = useState(false); // State to track if a search has been performed
  const [from, setFrom] = useState<string>(""); // State for origin airport/city input
  const [to, setTo] = useState<string>(""); // State for destination airport/city input
  const [departureDate, setDepartureDate] = useState<string>(""); // State for departure date
  const [returnDate, setReturnDate] = useState<string | null>(null); // State for return date (null for one-way trips)
  const [cabinClass, setCabinClass] = useState<string>("economy"); // State for cabin class
  const [adults, setAdults] = useState<number>(1); // State for the number of adults

  // Handler function for departure date input change
  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartureDate(e.target.value);
  };

  // Handler function for return date input change
  const handleReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnDate(e.target.value || null);
  };

  // Handler function for initiating the flight search
  const handleSearch = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      setHasSearchedOnce(true); // Set hasSearchedOnce to true after the first search attempt
      const formattedDepartureDate = formatToYYYYMMDD(departureDate); // Format departure date to YYYY-MM-DD
      const formattedReturnDate = returnDate ? formatToYYYYMMDD(returnDate) : null; // Format return date if it exists

      const results = await fetchFlightsCompleteWithDynamicIds( // Call the API function to fetch flights
        from,
        to,
        formattedDepartureDate,
        cabinClass,
        adults,
        "best", // Sort by
        "USD", // Currency
        "en-US", // Market
        "US" // Country
      );

      setFlights(results); // Update the flights state with the fetched data
    } catch (error) {
      console.error("Error searching for flights:", error); // Log any errors to the console
      alert("There was an issue fetching flight data. Please try again."); // Display an alert to the user
    } finally {
      setLoading(false); // Set loading to false after the API call completes (whether successful or not)
    }
  };

  // Helper function to format dates to YYYY-MM-DD format
  const formatToYYYYMMDD = (date: string | number | Date): string => {
    const d = new Date(date); // Create a new Date object from the input
    const year = d.getFullYear(); // Get the year
    const month = d.getMonth() + 1; // Get the month (0-indexed, so add 1)
    const day = d.getDate(); // Get the day
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`; // Return the formatted date string
  };

  
  return (
    <div>
      <div className="bg-white dark:bg-customgray p-6 rounded-2xl shadow-lg max-w-4xl mx-auto mt-5"> {/* Search form container */}
        <h1 className="sr-only">Flight Search</h1> {/* Screen reader only heading */}
        <div className="flex flex-col space-y-4"> {/* Container for form elements */}
          {/* Trip type, passengers, and class selects */}
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"> {/* Container for select elements */}

            {/* Trip Type select */}
            <div className="relative w-full sm:w-auto">
              <select
                id="tripType"
                value={tripType}
                onChange={(e) => setTripType(e.target.value as "round-trip" | "one-way")} // Update tripType state
                className="appearance-none bg-white dark:bg-customgray text-black dark:text-slate-200 rounded pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 dark:border-none border border-gray-300 dark:border-none w-full" // Styling for the select element
              >
                <option value="round-trip">Round trip</option> {/* Option for round trip */}
                <option value="one-way">One way</option> {/* Option for one way */}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /> {/* Icon for the select */}
            </div>

            {/* Passengers select */}
            <div className="relative w-full sm:w-auto">
              <select
                id="passengers"
                defaultValue="1"
                className="appearance-none bg-white dark:bg-customgray text-black dark:text-slate-200 rounded pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 dark:border-none border border-gray-300 dark:border-none w-full" // Styling for the select
              >
                <option value="1">1 passenger</option> {/* Options for number of passengers */}
                <option value="2">2 passengers</option>
                <option value="3">3 passengers</option>
                <option value="4">4 passengers</option>
              </select>
              <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /> {/* Icon for the select */}
            </div>

            {/* Class select */}
            <div className="relative w-full sm:w-auto">
              <select
                id="class"
                defaultValue="economy"
                className="appearance-none bg-white dark:bg-customgray text-black dark:text-slate-200 rounded pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 dark:border-none border border-gray-300 dark:border-none w-full" // Styling for the select
              >
                <option value="economy">Economy</option> {/* Options for cabin class */}
                <option value="premium">Premium economy</option>
                <option value="business">Business</option>
                <option value="first">First class</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} /> {/* Icon for the select */}
            </div>
          </div>

        {/* From and To inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Where from?"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 bg-white dark:bg-customgray text-black dark:text-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Where to?"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 bg-white dark:bg-customgray text-black dark:text-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Date inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="date"
              value={departureDate}
              onChange={handleDepartureChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 bg-white dark:bg-customgray text-black dark:text-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-none"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          {tripType === "round-trip" && (
            <div className="relative">
              <input
                type="date"
                value={returnDate || ""}
                onChange={handleReturnChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 bg-white dark:bg-customgray text-black dark:text-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-none"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          )}
        </div>

        {/* Search button */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => { setFrom(""); setTo(""); setDepartureDate(""); setReturnDate(null); setFlights([]); }}
            className="flex items-center px-4 py-2 border border-gray-300 bg-white dark:bg-customgray text-black dark:text-slate-200 rounded-full focus:outline-none focus:ring-2 dark:border-none"
          >
            <RefreshCw className="mr-2" size={18} />
            Reset
          </button>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-500 dark:bg-blue-500 text-gray-800 dark:text-white rounded-full hover:bg-blue-300 focus:outline-none "
          >
            <Search className="mr-2 text-gray-800 dark:text-white" size={18} />
            {loading ? "Searching..." : "Explore"}
          </button>
        </div>
      </div>
      </div>

      {/* Display flight results */}
      {flights.length > 0 ? (
        <FlightResults flights={flights} className="mt-5 p-6 max-w-4xl mx-auto" />
      ) : (
        hasSearchedOnce && !loading && <p className="mt-5 text-center">No flights found.</p>
      )}
      
  </div>
  );
}