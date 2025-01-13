import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFilm } from "react-icons/fa"; // Importing the movie icon

const Navbar = ({ mode }) => {
    const navigate = useNavigate();

    return (
        <div className={`flex flex-col sm:flex-row justify-between items-center p-4 ${mode === 'dark' ? "bg-gray-900 text-gray-200 shadow-lg" : "bg-white text-gray-800 shadow-md"} border-b ${mode === 'dark' ? "border-gray-700" : "border-gray-200"}`}>
            {/* Logo Section */}
            <div className="flex items-center mb-4 md:mb-0">
                <FaFilm className="mr-2 text-xl" /> {/* Movie Icon */}
                <button
                    onClick={() => navigate('/')}
                    className="text-2xl font-bold focus:outline-none hover:text-rgb(40 88 194) transition-colors"
                >
                    MovieSearch
                </button>
            </div>

            {/* Links and Mode Toggle */}
            <div className="flex items-center space-x-4 md:space-x-4 flex-col md:flex-row">
                <ul className="flex space-x-4 wrap md:space-x-4">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `hover:underline ${
                                    isActive 
                                        ? (mode === 'dark' ? "text-[rgb(40,88,194)] font-semibold" : "text-gray-700 font-semibold")
                                        : ""
                                } ${mode === 'dark' ? "hover:text-gray-100" : "hover:text-blue-500"}`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                `hover:underline ${
                                    isActive 
                                        ? (mode === 'dark' ? "text-[rgb(40,88,194)] font-semibold" : "text-gray-700 font-semibold")
                                        : ""
                                } ${mode === 'dark' ? "hover:text-gray-100" : "hover:text-blue-500"}`
                            }
                        >
                            Favorites
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `hover:underline ${
                                    isActive 
                                        ? (mode === 'dark' ? "text-[rgb(40,88,194)] font-semibold" : "text-gray-700 font-semibold")
                                        : ""
                                } ${mode === 'dark' ? "hover:text-gray-100" : "hover:text-blue-500"}`
                            }
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;