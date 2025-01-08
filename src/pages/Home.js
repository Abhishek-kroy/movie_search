import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';

const Home = (props) => {
    const { mode, setMode } = props;
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mode]);

    return (
        <div className={`min-h-screen ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} transition-all duration-300`}>
            {/* Navbar with scroll effects */}
            <Navbar mode={mode} setMode={setMode} isScrolled={isScrolled} />

            <Carousel />

            <div
                className={`min-h-screen flex flex-col items-center justify-center ${mode === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} transition-all duration-300`}
            >
                <div className="w-full max-w-lg text-center">
                    <h1 className="text-4xl font-bold mt-4 transform transition-transform duration-300 hover:scale-105">
                        Welcome to MovieSearch
                    </h1>
                    <p className="mt-2 text-lg">Search for your favorite movies and TV shows</p>

                    <button
                        onClick={toggleTheme}
                        className={`mt-6 px-6 py-3 rounded-full transition-all duration-300 ${mode === 'light' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
                        aria-label="Toggle theme"
                    >
                        Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
                    </button>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-4">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer bg-cover bg-center h-80 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 ease-in-out hover:scale-105"
                            style={{
                                backgroundImage: `url('https://via.placeholder.com/300x450.png?text=Movie+${index + 1}')`,
                            }}
                            // http://www.omdbapi.com/?apikey=8eb679da&s=superman
                        >
                            <div className="absolute inset-0 bg-black opacity-30"></div>
                            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="text-center text-white p-4">
                                    <h2 className="text-2xl font-semibold">Movie Title {index + 1}</h2>
                                    <p className="mt-2 text-lg">Release Year: 2023</p>
                                    <p className="mt-2 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="fixed bottom-8 right-8 z-50">
                    <button
                        onClick={toggleTheme}
                        className="w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex justify-center items-center hover:bg-blue-600 focus:outline-none transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        {mode === 'light' ? '🌙' : '🌞'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;