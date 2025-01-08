import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";

// Carousel Component
const Carousel = () => {
  const [movies, setMovies] = useState([]);

  const apiUrl = "http://www.omdbapi.com/?apikey=8eb679da&s=superman";  // Example: searching for movies with 'superman'

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Set autoplay speed
  };

  // Fetch movie data from OMDb API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
       
        const response = await axios.get(apiUrl);

        // Check if data is available
        if (response.data.Response === "True") {
          setMovies(response.data.Search); // Access Search array
        } else {
          console.error("No movies found");
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="carousel-container py-8">
      <Slider {...settings}>
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 object-cover"
              />
            </div>
          ))
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </Slider>
    </div>
  );
};

export default Carousel;