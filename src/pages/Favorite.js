import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Card from '../components/Card'; // Assuming you have a Card component
import Footer from '../components/footer';
import ToggleButton from '../components/ToggleButton';

const Favorite = (props) => {
    const { mode, setMode } = props;
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const moviesData = [];

            for (let title of favorites) {
                const apiUrl = `http://www.omdbapi.com/?apikey=8eb679da&t=${title}&plot=full`;  // Fix the API URL
                try {
                    const response = await axios.get(apiUrl);
                    if (response.data.Response === "True") {
                        moviesData.push(response.data);
                    }
                } catch (err) {
                    console.log(err);
                }
            }

            setFavoriteMovies(moviesData);
        };

        fetchFavoriteMovies();
    }, []);

    return (
        <div className={`flex flex-col min-h-screen ${mode === "light"
                ? "bg-gradient-to-b from-white to-gray-50 text-gray-800"
                : "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
                } transition-all duration-300`}>
            <Navbar mode={mode} />
            
            <div className={`flex flex-col mt-4 mb-4 px-4 ${mode === "light"
                ? "bg-gradient-to-b from-white to-gray-50 text-gray-800"
                : "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
                } transition-all duration-300 flex-grow`}>
                
                {favoriteMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {favoriteMovies.map((movie, index) => (
                            <Card
                                key={index}
                                title={movie.Title}
                                year={movie.Year}
                                imgUrl={movie.Poster}
                                plot={movie.Plot}
                                ratings={movie.Ratings}
                                mode={mode}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No favorite movies found.</p>
                )}
            </div>
            
            {/* <div className="mt-8"> */}
                <ToggleButton mode={mode} setMode={setMode} />
            {/* </div> */}
            
            <Footer mode={mode}/>
        </div>
    );
};

export default Favorite;