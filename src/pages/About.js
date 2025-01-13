import React from "react";
import Navbar from "../components/Navbar";
import { FaInfoCircle, FaUsers, FaClipboardList } from "react-icons/fa"; // Icons for sections
import ToggleButton from "../components/ToggleButton";

const About = ({ mode, setMode }) => {
    

    return (
        <div className={`min-h-screen ${mode === 'dark' ? "bg-gray-900 text-white" : "bg-white text-gray-900"} transition-all duration-300`}>
            {/* Navbar */}
            <Navbar mode={mode} setMode={setMode} />

            {/* About Page Content */}
            <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <FaInfoCircle className="text-6xl text-blue-500 mb-4 mx-auto" />
                    <h1 className="text-4xl font-semibold mb-2">About MovieSearch</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        MovieSearch is your one-stop destination to search for your favorite movies and TV shows. Our platform helps you discover new content, explore detailed information, and keep track of all your entertainment choices.
                    </p>
                </div>

                {/* Features Section */}
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <div className={`flex flex-col items-center ${mode === 'light' ? 'bg-white' : 'dark:bg-gray-800'} shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow duration-300`}>
                        <FaClipboardList className="text-4xl text-blue-500 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Search Easily</h2>
                        <p className="text-center">
                            Our intuitive search feature helps you find movies and TV shows quickly, with powerful filters to refine your results based on genre, release year, and more.
                        </p>
                    </div>
                    <div className={`flex flex-col items-center ${mode === 'light' ? 'bg-white' : 'dark:bg-gray-800'} shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow duration-300`}>
                        <FaUsers className="text-4xl text-blue-500 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">User-Friendly</h2>
                        <p className="text-center">
                            Whether you're a movie enthusiast or just looking for something to watch, our platform provides a seamless and enjoyable experience across all devices.
                        </p>
                    </div>
                    <div className={`flex flex-col items-center ${mode === 'light' ? 'bg-white' : 'dark:bg-gray-800'} shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow duration-300`}>
                        <FaInfoCircle className="text-4xl text-blue-500 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Detailed Information</h2>
                        <p className="text-center">
                            We provide detailed information on movies and TV shows, including ratings, cast, genres, trailers, and more to help you make informed choices.
                        </p>
                    </div>
                </div>

                {/* Our Mission Section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-lg">
                        Our mission is simple: to empower users to discover and explore movies and TV shows in the most efficient, user-friendly way possible. We aim to bring the world of entertainment right at your fingertips.
                    </p>
                </div>

                {/* Meet the Team Section */}
                <div className={`w-[80vw] lg:w-[30vw] flex flex-col justify-center items-center ${mode === 'light' ? 'bg-white' : 'dark:bg-gray-800'} py-16 px-4 mb-16 rounded-lg shadow-lg`}>
                    <h2 className="text-2xl font-semibold text-center mb-8">Meet the Team</h2>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-blue-200 rounded-full mb-4"></div> {/* Placeholder for team member photo */}
                            <h3 className="font-semibold">Abhishek Kumar Roy</h3>
                            <p className="text-gray-500">Project Owner</p>
                        </div>
                    </div>
                </div>

                {/* Contact Us Section */}
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p className="text-lg">
                        If you have any questions, feedback, or just want to say hello, feel free to reach out to us at: <a href="mailto:support@moviesearch.com" className="text-blue-500">support@moviesearch.com</a>
                    </p>
                </div>
            </div>

            <ToggleButton mode={mode} setMode={setMode}/>
        </div>
    );
};

export default About;