import React from "react";
import Card from "./Card";
import { FaSpinner } from "react-icons/fa";

const Cards = ({ mode, suggestedMovies, isloading }) => {

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