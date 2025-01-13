import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Cards = ({ mode, suggestedMovies, isloading }) => {
  const [isLiked, setIsLiked] = useState([]);

  // Update the isLiked array only when suggestedMovies changes
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    for (let i = 0; i < suggestedMovies.length; i++) {
      if (favorites.includes(suggestedMovies[i].Title)) {
        setIsLiked((prev) => [...prev, true]);
      } else {
        setIsLiked((prev) => [...prev, false]);
    }
  }}, [suggestedMovies]);

  // Function to toggle the "liked" status of a movie
  const handleLiked = (index) => {
    const updatedLikes = [...isLiked];
    updatedLikes[index] = !updatedLikes[index];  // Toggle like status
  
    const movie = suggestedMovies[index];
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!updatedLikes[index]) {
      const updatedFavorites = favorites.filter(favMovie => favMovie !== movie.Title);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      if(!favorites.includes(movie.Title)){
          favorites.push(movie.Title);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  
    // Show appropriate toast
    if (!updatedLikes[index]) {
      toast.info("Movie Unliked!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: mode === "light" ? "light" : "dark",
      });
    } else {
      toast.success("Movie Liked!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: mode === "light" ? "light" : "dark",
      });
    }
  
    // Update the 'isLiked' state for the movie
    setIsLiked(updatedLikes);
  };  

  return (
    <div className="flex flex-col mt-4 px-4">
      {suggestedMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestedMovies.map((movie, index) => (
            <Card
              key={index}
              mode={mode}
              title={movie.Title}
              year={movie.Year}
              imgUrl={movie.Poster}
              plot={movie.Plot}
              ratings={movie.Ratings}
              isLiked={isLiked[index]}  // Pass the individual "liked" state for each card
              handleLiked={() => handleLiked(index)}  // Pass the function to toggle "liked"
            />
          ))}
        </div>
      ) : (
        <p className={`text-center ${mode === "light" ? "text-gray-800" : "text-gray-300"}`}>
          {isloading === "" ? "" : isloading === "Movie not found" ? "Movie not found with this name." : <FaSpinner className="animate-spin text-blue-500" style={{ fontSize: "30px" }} />}
        </p>
      )}
    </div>
  );
};

export default Cards;