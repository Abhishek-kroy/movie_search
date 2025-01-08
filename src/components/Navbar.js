import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaFilm } from "react-icons/fa"; // Importing icons for light and dark mode

const Navbar = ({ mode, setMode }) => {
    let isDarkMode = mode;

    // Toggle the mode on button click
    const handleModeToggle = () => {
        setMode(!isDarkMode);
    };

    return (
        <div className={`flex flex-col sm:flex-row justify-between items-center p-4 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} shadow-md`}>
            {/* Logo Section */}
            <div className="flex items-center mb-4 md:mb-0">
                <FaFilm className="mr-2 text-xl" /> {/* Movie Icon */}
                <Link to="/" className="text-2xl font-bold">
                    MovieSearch
                </Link>
            </div>

            {/* Links and Mode Toggle */}
            <div className="flex items-center space-x-4 md:space-x-4 flex-col md:flex-row">
                <ul className="flex space-x-4 wrap md:space-x-4">
                    <li>
                        <Link
                            to="/"
                            className={`hover:underline ${isDarkMode ? "hover:text-gray-300" : "hover:text-blue-500"}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/favorites"
                            className={`hover:underline ${isDarkMode ? "hover:text-gray-300" : "hover:text-blue-500"}`}
                        >
                            Favorites
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={`hover:underline ${isDarkMode ? "hover:text-gray-300" : "hover:text-blue-500"}`}
                        >
                            About
                        </Link>
                    </li>
                </ul>

                <button
                    onClick={handleModeToggle}
                    className="ml-4 p-2 rounded-full hover:bg-gray-700 focus:outline-none"
                >
                    {isDarkMode ? (
                        <FaSun className="text-yellow-500" />
                    ) : (
                        <FaMoon className="text-gray-800" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Navbar;