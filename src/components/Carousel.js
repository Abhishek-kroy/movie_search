import React, { useState, useEffect } from "react";
import axios from "axios";

const Carousel = () => {
    const [movies, setMovies] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0); // Track active slide

    const apiUrl = "http://www.omdbapi.com/?apikey=8eb679da&s=superman";

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(apiUrl);
                if (response.data.Response === "True") {
                    setMovies(response.data.Search);
                    
                } else {
                    console.error("No movies found");
                }
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };
        fetchMovies();
    }, []);

useEffect(() => {
    console.log(movies); // Change slide every 3 seconds
}, [movies.length]); // Re-run if movie length changes

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % movies.length); // Circular navigation
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [movies.length]); // Re-run if movie length changes

    const goToPreviousSlide = () => {
        setActiveIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
    };

    const goToNextSlide = () => {
        setActiveIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    };

    return (
        <div id="default-carousel" className="relative w-full mt-2 mb-2">
            <div className="relative h-[60vh] md:h-[60vh] lg:h-[80vh] overflow-hidden rounded-lg">
                {movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <div
                            key={index}
                            style={{ '--image-url': `url(${movie.Poster})` }} // Dynamically setting the background image
                            className={`bg-[image:var(--image-url)] bg-contain bg-center h-[80vh] w-full relative ${index === activeIndex ? "" : "hidden"} duration-200 ease-in-out`}
                        >
                            {/* Background blur */}
                            <div className="absolute inset-0 bg-black bg-opacity-60 blur-md"></div> {/* Add the blur and overlay */}

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end items-center p-4 space-y-4">
                                <h1 className="text-3xl font-semibold text-white">{movie.Title}</h1>
                                <p className="text-lg font-light text-white"><strong>{movie.Year}</strong></p>
                                <p className="text-base">{movie.Plot}</p>
                            </div>
                        </div>

                    ))
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-xl font-semibold text-gray-500">Loading...</p>
                    </div>
                )}
            </div>


            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-blue-500" : "bg-gray-300"}`}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <button
                type="button"
                onClick={goToPreviousSlide}
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                    &lt;
                </span>
            </button>
            <button
                type="button"
                onClick={goToNextSlide}
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                    &gt;
                </span>
            </button>
        </div>
    );
};

export default Carousel;