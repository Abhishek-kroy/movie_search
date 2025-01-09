import React, { useState } from "react";

const Search = ({ mode }) => {
  const [movieName, setMovieName] = useState("");

  const handleInputChange = (event) => {
    setMovieName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (movieName.trim()) {
      console.log(`Searching for movie: ${movieName}`);
      // Add logic here to handle the movie search, e.g., make an API call
    } else {
      console.log("Please enter a movie name.");
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center p-6 border rounded-lg shadow-md ${
        mode === "light"
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
          className={`text-sm font-medium ${
            mode === "light" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Enter Movie Name:
        </label>
        <input
          id="movie-input"
          type="text"
          value={movieName}
          onChange={handleInputChange}
          placeholder="Type a movie name"
          className={`flex-grow px-4 py-2 border rounded-lg outline-none focus:ring-2 ${
            mode === "light"
              ? "bg-white border-gray-300 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
              : "bg-gray-700 border-gray-600 focus:ring-blue-400 text-gray-300 placeholder-gray-400"
          }`}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            mode === "light"
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