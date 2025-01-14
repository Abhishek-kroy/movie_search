import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "./Card.css";

// Helper function to get favorites from localStorage
const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch {
    return [];
  }
};

const Card = ({ title, mode }) => {
  const getMovieDetails = async (title) => {
    try {
      console.log(process.env.REACT_APP_OMDBAPIKEY);
      const apiUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDBAPIKEY}&t=${title}&plot=full`;
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return {
        Title: title,
        Year: "N/A",
        Plot: "Details not available",
        Ratings: [],
        Poster: "",
      };
    }
  };

  const [movieDetails, setMovieDetails] = useState({
    Title: "",
    Year: "",
    Plot: "",
    Ratings: [],
    Poster: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(getFavorites().includes(title));
  const [showFullPlot, setShowFullPlot] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMovieDetails(title).then((data) => {
      setMovieDetails(data);
      setIsLoading(false);
    });
  }, [title]);

  const handleLiked = () => {
    let updatedFavorites;
    if (isLiked) {
      updatedFavorites = getFavorites().filter((fav) => fav !== title);
    } else {
      updatedFavorites = [...getFavorites(), title];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsLiked(!isLiked);

    toast[isLiked ? "info" : "success"](
      isLiked ? "Movie Unliked!" : "Movie Liked!",
      { position: "top-right", autoClose: 3000, theme: mode }
    );
  };

  const togglePlot = () => setShowFullPlot(!showFullPlot);

  const imdbRating =
    movieDetails.Ratings?.find((rating) => rating.Source === "Internet Movie Database")?.Value ||
    "N/A";

  const cardModeClass = mode === "dark" ? "dark" : "";
  const textModeClass = mode === "dark" ? "dark:bg-gray-800 dark:text-white" : "bg-white text-gray-800";
  const headingClass = mode === "dark" ? "text-white" : "text-gray-800";
  const secondaryHeadingClass = mode === "dark" ? "text-gray-300" : "text-gray-700";

  return isLoading ? (
    <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading...</div>
  ) : (
    <div className={`relative group bg-white dark:bg-gray-800 h-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row ${cardModeClass}`}>
      <div className="w-full md:w-1/3 overflow-hidden rounded-3xl">
        <img
          src={movieDetails.Poster || "/path/to/placeholder-image.jpg"}
          alt={title}
          className="object-cover w-full h-full rounded-3xl"
        />
      </div>
      <div className={`h-full p-6 md:w-2/3 flex flex-col justify-between ${textModeClass}`}>
        <div className="items-center justify-between mb-4">
          <h2 className={`text-3xl font-bold ${headingClass}`}>{movieDetails.Title || "Untitled"}</h2>
          <div className="mt-2"><strong>Year:</strong> {movieDetails.Year || "N/A"}</div>
        </div>
        <div>
          <h3 className={`font-semibold text-lg ${secondaryHeadingClass}`}>Plot:</h3>
          <p className={headingClass}>
            {showFullPlot ? movieDetails.Plot : `${movieDetails.Plot?.substring(0, 200)}...`}
          </p>
          <button
            onClick={togglePlot}
            className="text-blue-500 hover:underline mt-2 dark:text-blue-400 font-semibold"
          >
            {showFullPlot ? "Show Less" : "Show More"}
          </button>
        </div>
        <div className="flex justify-between mt-6">
          <p><strong>IMDb Rating:</strong> {imdbRating}</p>
          <FaHeart
            aria-label={isLiked ? "Unlike movie" : "Like movie"}
            onClick={handleLiked}
            className={`cursor-pointer text-2xl transition-all duration-300 transform ${isLiked ? "text-red-600 scale-110 animate-heart-jump" : "text-gray-300 hover:text-red-300"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;