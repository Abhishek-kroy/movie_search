import React, { useState } from "react";
import axios from "axios";

const Search = ({ mode, setsuggestedMovies, setisloading }) => {
  const [movieName, setMovieName] = useState("");

  const DisplayMovies = async () => {
    try {
      const apiUrl1 = `http://www.omdbapi.com/?apikey=8eb679da&s=${movieName}`;
      const response1 = await axios.get(apiUrl1);
      console.log("Static Movie Lists:", response1.data.Search);
  
      const staticMovieData = response1.data.Search
        ? [...response1.data.Search]
        : [];
      setsuggestedMovies(staticMovieData);  // Show static movies immediately
  
      const systemPrompt = "You are a good movie advisor based on input, and if not found, suggest movies related to that. Just return an array of movie names only";
      const userPrompt = `Tell me few movies with the name ${movieName}`;
  
      try {
        const aimlResponse = await axios.get('http://localhost:3000/api/v1/aimlsuggesstion', {
          params: {
            systemPrompt: systemPrompt,
            userPrompt: userPrompt
          }
        });
  
        console.log("AIML API Response:", aimlResponse.data.response);
  
        let movieTitles = [];
  
        // Processing the response to extract movie names
        if (Array.isArray(aimlResponse.data.response)) {
          movieTitles = aimlResponse.data.response;
        } else if (typeof aimlResponse.data.response === 'string') {
          try {
            const parsedMovies = JSON.parse(aimlResponse.data.response.trim());
            movieTitles = Array.isArray(parsedMovies) ? parsedMovies : [];
          } catch (e) {
            console.error("Failed to parse string as JSON:", e);
            movieTitles = aimlResponse.data.response
              .split(/,|\n/).map(name => name.trim().replace(/^\d+\./, "").split("(")[0].trim())
              .filter(name => name);
          }
        } else if (aimlResponse.data && aimlResponse.data.movies) {
          movieTitles = aimlResponse.data.movies || [];
        } else {
          console.error("Unexpected response format", aimlResponse.data);
          return;
        }
  
        if (movieTitles.length === 0) {
          console.log("No movies found in AIML response.");
          return;
        }
        const movieApiCalls = movieTitles.map(async (title) => {
          const response = await axios.get(`http://www.omdbapi.com/?apikey=8eb679da&t=${title}&plot=full`);
          return response.data.Response === "True" ? response.data : null;
        });
  
        const dynamicMovies = await Promise.all(movieApiCalls);
        const allMovies = dynamicMovies.filter(movie => movie !== null);
  
        console.log("Final list of movies:", allMovies);
        setsuggestedMovies(prevMovies => [...prevMovies, ...allMovies]);  // Add dynamic movies to the list
  
      } catch (error) {
        console.error("Error fetching movie suggestions:", error);
      }
    } catch (error) {
      setisloading("Movie not found");
      console.error("Error in outer try block, please try again to search for it:", error);
    }
  };    

  const handleInputChange = (event) => {
    setMovieName(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (movieName.trim() !== "") {
      console.log(`Searching for movie: ${movieName}`);
      setisloading(movieName.trim());
      setMovieName(movieName.trim());
      DisplayMovies();
    } else {
      console.log("Please enter a movie name.");
    }
  };
  return (
    <div
      className={`flex flex-col justify-center items-center p-6 border rounded-lg shadow-md ${mode === "light"
        ? "bg-white text-gray-800 border-gray-300"
        : "bg-gray-800 text-gray-300 border-gray-700"
        }`}
    >
      <div className="text-xl font-bold mb-4">
        Search for a Movie
      </div>
      <div>


        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <label
            htmlFor="movie-input"
            className={`text-sm font-medium ${mode === "light" ? "text-gray-600" : "text-gray-400"
              }`}
          >
            Enter Movie Name:
          </label>
          <input
            id="movie-input"
            type="text"
            onChange={handleInputChange}
            value={movieName}
            placeholder="Type a movie name"
            className={`flex-grow px-4 py-2 border rounded-lg outline-none focus:ring-2 ${mode === "light"
              ? "bg-white border-gray-300 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
              : "bg-gray-700 border-gray-600 focus:ring-blue-400 text-gray-300 placeholder-gray-400"
              }`}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${mode === "light"
              ? "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500"
              : "bg-blue-500 text-gray-900 hover:bg-blue-400 focus:ring-blue-400"
              }`}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;