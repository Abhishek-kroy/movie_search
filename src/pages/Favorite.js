import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/footer';
import ToggleButton from '../components/ToggleButton';

const Favorite = (props) => {
    const { mode, setMode } = props;
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            setFavoriteMovies(favorites);
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
                        {favoriteMovies.map((title, index) => (
                            <Card
                                key={index}
                                title={title}
                               
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