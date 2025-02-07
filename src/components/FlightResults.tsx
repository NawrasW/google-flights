import React from "react";
import { Flight } from "../api/flightApi"; // Import the Flight interface

// Define the FlightResultsProps interface for type safety
interface FlightResultsProps {
  flights: Flight[]; // Array of Flight objects
  className?: string; // Optional className for styling
}

// Functional component to display flight search results
const FlightResults: React.FC<FlightResultsProps> = ({ flights, className }) => {
  // If no flights are found, return null (nothing to display)
  if (flights.length === 0) return null;

  // Return the JSX structure for displaying flight results
  return (
    <div className={className || "mt-6"}> {/* Apply className or default margin */}
      <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
        Search Results {/* Heading for the search results */}
      </h2>
      <div className="space-y-4"> {/* Use space-y-4 for spacing between flight results */}
        {flights.map((flight, index) => (
          <div 
            key={index} // Use index as key (should be unique for this use case)
            className="p-4 rounded-2xl bg-gray-100 shadow-lg dark:bg-customgray" // Styling for each flight result
          >
            <h3 className="text-md font-medium text-black dark:text-white">
              {flight.airline} - {flight.flightNumber} {/* Display airline and flight number */}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Departure: {flight.departureTime} | Arrival: {flight.arrivalTime} {/* Display departure and arrival times */}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Duration: {flight.duration} | Stops: {flight.stops} {/* Display duration and number of stops */}
            </p>
            <p className="text-md font-semibold text-black dark:text-white">
              Price: ${flight.price} {/* Display the price */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults; 