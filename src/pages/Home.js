import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import ToggleButton from "../components/ToggleButton";
import Search from "../components/Search";
import Cards from "../components/Cards";
import Footer from "../components/footer";

const Home = (props) => {
    const { mode, setMode } = props;
    
    const [suggestedMovies, setsuggestedMovies] = useState([]);
    const [isloading, setisloading] = useState("");

    return (
        <div
            className={`min-h-screen ${mode === "light"
                ? "bg-gradient-to-b from-gray-50 to-white text-gray-800"
                : "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
                } transition-all duration-300`}>

            <Navbar mode={mode} />

            <Carousel />

            <div
                className={` min-h-screen flex flex-col items-center justify-start ${mode === "light"
                    ? "bg-gradient-to-b from-white to-gray-50 text-gray-800"
                    : "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
                    } transition-all duration-300`}
            >
                <div className="mb-4 w-full max-w-lg text-center">
                    <h1 className="text-5xl font-extrabold mt-4 mb-4 transform transition-transform duration-300 hover:scale-110 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        Welcome to MovieSearch
                    </h1>
                    <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">
                        Search for your favorite movies and TV shows with ease.
                    </p>
                </div>

                <Search mode={mode} setsuggestedMovies={setsuggestedMovies} setisloading={setisloading}/>
                <Cards mode={mode} suggestedMovies={suggestedMovies} isloading={isloading}/>
                <div className="mt-8">
                    <ToggleButton mode={mode} setMode={setMode} />
                </div>
            </div>
            <div className="w-full h-full">
                <Footer mode={mode} />
            </div>
        </div>
    );
};

export default Home;