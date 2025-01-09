import React from "react";

const Card = ({ title, year, id, type, imgUrl }) => {
  return (
    <div
      className="relative group cursor-pointer bg-cover bg-center h-80 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 ease-in-out hover:scale-105"
      style={{
        backgroundImage: `url('${imgUrl}')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-lg font-bold text-white truncate">{title || "Untitled"}</h2>
        <p className="text-sm text-gray-300">Year: {year || "N/A"}</p>
        <p className="text-sm text-gray-300">Type: {type || "Unknown"}</p>
      </div>
    </div>
  );
};

export default Card;
