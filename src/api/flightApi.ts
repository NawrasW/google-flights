// flightApi.js (API interaction logic)
import { useState } from "react";

// Define the Flight interface
export interface Flight {
  airline: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  flightNumber: string;
  [key: string]: any; // Allow for other properties
}

// Fetch airport details based on location (city/airport name)
export const fetchAirportDetails = async (location: string) => {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${location}&locale=en-US`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY as string, // Access API key from environment variables
      "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch airport details for ${location}: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      throw new Error(`No airports found for ${location}`);
    }

    // Prioritize major airports 
    const majorAirports = ["LHR", "JFK", "CDG", "DXB", "AMS"];
    const preferredAirport = data.data.find((airport: any) => majorAirports.includes(airport.skyId)) || data.data[0];

    return {
      skyId: preferredAirport.skyId,
      entityId: preferredAirport.entityId,
    };
  } catch (error) {
    console.error("Error fetching airport details:", error);
    return null;
  }
};

// Fetch flight data using origin and destination IDs
export const fetchFlightsComplete = async (
  originSkyId: string,
  destinationSkyId: string,
  originEntityId: string,
  destinationEntityId: string,
  date: string, // YYYY-MM-DD
  cabinClass: string = "economy",
  adults: number = 1,
  sortBy: string = "best",
  currency: string = "USD",
  market: string = "en-US",
  countryCode: string = "US"
): Promise<Flight[]> => {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${date}&cabinClass=${cabinClass}&adults=${adults}&sortBy=${sortBy}&currency=${currency}&market=${market}&countryCode=${countryCode}`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY as string,
      "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
    }

    const data: any = await response.json();

    const flights: Flight[] = data.data?.itineraries?.map((itinerary: any) => {
      const legs = itinerary.legs;
      const firstLeg = legs[0];

      return {
        airline: firstLeg.carriers.marketing[0].name,
        flightNumber: firstLeg.flightNumber,
        departureTime: firstLeg.departure,
        arrivalTime: firstLeg.arrival,
        duration: itinerary.duration,
        stops: legs.length - 1,
        price: itinerary.price?.raw || 0, // Access price.raw, default to 0 if missing
      };
    }) || [];

    return flights;
  } catch (error) {
    console.error("Error fetching flights (complete):", error);
    throw error;
  }
};

// Helper function to fetch flights with dynamic origin and destination IDs
export const fetchFlightsCompleteWithDynamicIds = async (
  origin: string,
  destination: string,
  date: string, // YYYY-MM-DD
  cabinClass: string = "economy",
  adults: number = 1,
  sortBy: string = "best",
  currency: string = "USD",
  market: string = "en-US",
  countryCode: string = "US"
) => {
  try {
    const originDetails = await fetchAirportDetails(origin);
    const destinationDetails = await fetchAirportDetails(destination);

    if (!originDetails || !destinationDetails) {
      throw new Error("Could not retrieve airport details.");
    }

    return fetchFlightsComplete(
      originDetails.skyId,
      destinationDetails.skyId,
      originDetails.entityId,
      destinationDetails.entityId,
      date,
      cabinClass,
      adults,
      sortBy,
      currency,
      market,
      countryCode
    );
  } catch (error) {
    console.error("Error fetching flights:", error);
    return [];
  }
};