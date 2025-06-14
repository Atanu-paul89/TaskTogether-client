import React from 'react';
import { NavLink } from 'react-router';
import Lottie from 'lottie-react';

import errorAnimation from '../Lottie-files/errorpage.json'; // Adjust path if your file name is different

const ErrorPage = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-0 items-center justify-center min-h-screen text-center p-4 lg:px-60 lg:mr-30">
            <div className="w-full lg:w-100 max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                <Lottie
                    animationData={errorAnimation}
                    loop={true}
                    autoplay={true}
                    className="w-full h-auto" // Use Tailwind for responsive width and auto height
                />
            </div>
            <div>
                <h1 className="text-5xl font-bold text-error mb-4">Oops!</h1>
                <p className="text-xl text-neutral-content mb-8">The page you're looking for doesn't exist.</p>
                <NavLink to="/" className="btn btn-primary">Go to Home</NavLink>
            </div>

        </div>
    );
};

export default ErrorPage;