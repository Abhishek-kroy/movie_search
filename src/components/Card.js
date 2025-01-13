import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./Card.css";
import { toast } from "react-toastify";

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch {
    return [];
  }
};


const Card = ({ title, year, imgUrl, plot, ratings, mode }) => {
  const [showFullPlot, setShowFullPlot] = useState(false);
  const [favorites, setFavorites] = useState(getFavorites());
  const [isLiked, setIsLiked] = useState(favorites.includes(title));
  
  const handleLiked = () => {
    let updatedFavorites;
    if (isLiked) {
      updatedFavorites = getFavorites().filter(favMovie => favMovie !== title);
    } else {
      updatedFavorites = [...getFavorites(), title];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    
    toast[isLiked ? "info" : "success"](
      isLiked ? "Movie Unliked!" : "Movie Liked!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: mode,
      }
    );
    setIsLiked(!isLiked);
  };

  const togglePlot = () => setShowFullPlot(!showFullPlot);

  const imdbRating = ratings?.find(rating => rating.Source === "Internet Movie Database")?.Value || "N/A";

  const cardModeClass = mode === "dark" ? "dark" : "";
  const containerClasses = `relative group cursor-pointer bg-white dark:bg-gray-800 h-auto rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-300 ease-in-out flex flex-col md:flex-row ${cardModeClass}`;
  const textModeClass = mode === "dark" ? "dark:bg-gray-800 dark:text-white" : "bg-white text-gray-800";

  const headingClass = mode === "dark" ? "text-white" : "text-gray-800";
  const secondaryHeadingClass = mode === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <div className={containerClasses}>
      <div className="w-full md:w-1/3 overflow-hidden rounded-3xl">
        <img
          src={imgUrl}
          alt={title}
          className="object-cover w-full h-full rounded-3xl transition-transform duration-300"
        />
      </div>

      <div className={`p-6 md:w-2/3 flex flex-col justify-between ${textModeClass}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-3xl font-bold ${headingClass} truncate`}>{title || "Untitled"}</h2>
        </div>

        <div className={`mb-4 text-sm ${headingClass}`}>
          <p><strong>Year:</strong> {year || "N/A"}</p>
        </div>

        <div className="">
          <h3 className={`font-semibold text-lg ${secondaryHeadingClass}`}>Plot:</h3>
          <p className={headingClass}>
            {showFullPlot ? plot : `${plot?.substring(0, 200)}...`}
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

          {/* Heart Icon with animation and color transition */}
          <FaHeart
            onClick={handleLiked}
            className={`cursor-pointer text-2xl transition-all duration-300 transform ${isLiked
                ? "text-red-600 scale-110 animate-heart-jump"  // Red heart with jump effect when liked
                : "text-gray-300 hover:text-red-300"
              }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;