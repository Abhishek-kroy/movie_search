import React from 'react';
import {Navigate} from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = ({ mode }) => {
    const backgroundColor = mode === 'light' ? 'bg-gray-100' : 'bg-gray-900';
    const textColor = mode === 'light' ? 'text-gray-800' : 'text-white';
    const borderColor = mode === 'light' ? 'border-gray-300' : 'border-gray-600';
    const linkHoverColor = mode === 'light' ? 'hover:text-blue-500' : 'hover:text-blue-600';

    return (
        <div className={`${backgroundColor} ${textColor} py-12 w-full`}>
            <div className="px-6 sm:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="index.html" className={`text-blue-400 ${linkHoverColor}`}>Home</a></li>
                            <li><a href="Blood_Availability_Search.html" className={`text-blue-400 ${linkHoverColor}`}>Favorites</a></li>
                            <li><a href="Blood_Bank_Directory.html" className={`text-blue-400 ${linkHoverColor}`}>About Us</a></li>
                            <li><a href="contactUs.html" className={`text-blue-400 ${linkHoverColor}`}>Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Info Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <ul>
                            <li className="text-sm">
                                Email: <a href="mailto:support@example.com" className={`text-blue-400 ${linkHoverColor}`}>support@example.com</a>
                            </li>
                            <li className="text-sm">
                                Phone: <a href="tel:+1234567890" className={`text-blue-400 ${linkHoverColor}`}>+1 (234) 567-890</a>
                            </li>
                            <li className="text-sm">Address: 123 Street, City, Country</li>
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className={`text-blue-400 ${linkHoverColor}`} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="#" className={`text-blue-400 ${linkHoverColor}`} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="#" className={`text-blue-400 ${linkHoverColor}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="#" className={`text-blue-400 ${linkHoverColor}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Legal Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className={`text-blue-400 ${linkHoverColor}`}>Privacy Policy</a></li>
                            <li><a href="#" className={`text-blue-400 ${linkHoverColor}`}>Terms & Conditions</a></li>
                            <li><a href="#" className={`text-blue-400 ${linkHoverColor}`}>Accessibility</a></li>
                            <li><a href="#" className={`text-blue-400 ${linkHoverColor}`}>Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className={`mt-8 border-t ${borderColor} pt-6 text-center text-sm`}>
                    <p>&copy; 2025 Movie Search Pvt Ltd. All rights reserved.</p>
                    <p className="text-gray-400">Last Updated: Jan 6, 2025</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;