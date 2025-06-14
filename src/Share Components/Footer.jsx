// Share Components/Footer.jsx
import React from 'react';
import { NavLink } from 'react-router';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content mt-12
                           grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <aside className="col-span-full md:col-span-1 lg:col-span-1
                              flex flex-col items-center md:items-start text-center md:text-left">
                <img src="/logo-transparent.png" alt="TaskTogether Logo" className="w-24 h-24 mb-2" />
                <p className="text-xl font-extrabold    text-primary">TaskTogether</p>
                <p className="text-sm">Providing reliable group study solutions since 2024.</p>
                <p className="text-xs text-neutral-content mt-2">Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside>

            {/* Each nav section will be a grid item */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left ml-18 lg:ml-0">
                <h6 className="footer-title text-primary">Services</h6>
                <a className="link link-hover text-base-content hover:text-primary transition-colors duration-200">Assignment Creation</a>
                <a className="link link-hover text-base-content hover:text-primary transition-colors duration-200">Peer Grading</a>
                <a className="link link-hover text-base-content hover:text-primary transition-colors duration-200">Study Collaboration</a>
                <a className="link link-hover text-base-content hover:text-primary transition-colors duration-200">Progress Tracking</a>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left ml-27 lg:ml-0">
                <h6 className="footer-title  text-primary">Company</h6>
                <NavLink to="/about" className="link link-hover  text-base-content hover:text-primary transition-colors duration-200">About Us</NavLink>
                <NavLink to="/contact" className="link link-hover text-base-content hover:text-primary transition-colors duration-200">Contact</NavLink>
                <NavLink to="/jobs" className="link link-hover text-base-content hover:text-primary transition-colors duration-200">Jobs</NavLink>
                <NavLink to="/press" className="link link-hover text-base-content hover:text-primary transition-colors duration-200">Press Kit</NavLink>
            </div>

            {/* Combined Legal and Social Media into one nav for better tablet layout */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left ml-18 lg:ml-0">
                <h6 className="footer-title text-primary">Connect with Us</h6>
                <div className="flex gap-4 mt-2">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-blue-600 transition-colors duration-200 text-2xl">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-blue-400 transition-colors duration-200 text-2xl">
                        <FaTwitter />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-pink-500 transition-colors duration-200 text-2xl">
                        <FaInstagram />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-red-600 transition-colors duration-200 text-2xl">
                        <FaYoutube />
                    </a>
                </div>
                {/* Moved Legal here to make 4 distinct grid items on large screens,
                    and better 2-column split on medium screens. */}
                <h6 className="footer-title text-primary mt-6">Legal</h6>
                <a className="link link-hover text-base-content hover:text-primary transition-colors duration-200">Terms of service</a>
                <a className="link link-hover text-base-content hover:text-primary transition-colors duration-200">Privacy policy</a>
                <a className="link link-hover text-base-content hover:text-primary transition-colors duration-200">Cookie policy</a>
            </div>
        </footer>
    );
};

export default Footer;