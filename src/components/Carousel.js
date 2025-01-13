import React, { useState, useEffect } from "react";
import axios from "axios";

const Carousel = () => {
    const [movies, setMovies] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const apiUrl1 = "http://www.omdbapi.com/?apikey=8eb679da&s=superman";
    const apiUrl2 = "http://www.omdbapi.com/?apikey=8eb679da&s=Avengers";

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch static movie lists first
                const response1 = await axios.get(apiUrl1);
                const response2 = await axios.get(apiUrl2);
                console.log("Static Movie Lists:", response1.data.Search, response2.data.Search);
        
                const systemPrompt = "You are a movie Suggestor";
                const userPrompt = "Suggest 10 movie trending all over the globe right now";
        
                // Always set static movies first
                
                const staticMovieData = [
                    ...response1.data.Search.slice(0, 1),
                    ...response2.data.Search.slice(0, 1)
                ];
        
                setMovies(staticMovieData);
        
                // Proceed to fetch AIML response if available
                const aimlResponse = await axios.get('http://localhost:3000/api/v1/aimlsuggesstion', {
                    params: {
                        systemPrompt: systemPrompt,
                        userPrompt: userPrompt
                    }
                });
        
                console.log("AIML API Response:", aimlResponse.data);
        
                let movieTitles = [];
                
                if (aimlResponse.data.success) {
                    console.log("Movie Suggestions:", aimlResponse.data.response);
        
                    // Extract movie names from the response
                    movieTitles = aimlResponse.data.response.match(/\"([^\"]+)\"/g).map(title => title.replace(/\"/g, ''));
                    console.log("Extracted Movie Titles:", movieTitles);
                } else {
                    console.error("Failed to fetch suggestions:", aimlResponse.data.error);
                }
        
                // Fetch additional movie data based on AIML response if available
                const movieApiCalls = movieTitles.map(async (title) => {
                    const response = await axios.get(`http://www.omdbapi.com/?apikey=8eb679da&s=${title}`);
                    if (response.data.Response === "True") {
                        return response.data.Search.slice(0, 1)[0]; // Add only the first movie result
                    } else {
                        console.log(`No results found for: ${title}`);
                        return null;
                    }
                });
        
                const dynamicMovies = await Promise.all(movieApiCalls);
        
                // Combine static and dynamic movies
                const allMovies = [...staticMovieData, ...dynamicMovies.filter((movie) => movie !== null)];
                setMovies(allMovies);
                console.log("All Movies:", allMovies);
        
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };              

        fetchMovies();
    }, []);

    useEffect(() => {
        console.log(movies);
    }, [movies.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % movies.length); // Circular navigation
        }, 3000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [movies.length]);

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
                            style={{ '--image-url': `url(${movie.Poster})` }}
                            className={`bg-[image:var(--image-url)] bg-contain bg-center h-[80vh] w-full relative ${index === activeIndex ? "" : "hidden"} duration-200 ease-in-out`}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-60 blur-md"></div>
                            <div className="absolute inset-0 flex flex-col justify-end items-center p-4 space-y-4">
                                <h1 className="text-3xl font-semibold text-white">{movie.Title}</h1>
                                <p className="text-lg font-light text-white"><strong>{movie.Year}</strong></p>
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