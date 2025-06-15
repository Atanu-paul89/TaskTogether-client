
import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaNewspaper, FaMicrophoneAlt } from 'react-icons/fa';

const Press = () => {
    const pressKitItems = [
        {
            id: 1,
            title: 'Press Releases Archive',
            description: 'Access our past official announcements and news releases.',
            icon: <FaNewspaper className="text-3xl text-accent" />,
            link: '#', // Replace with actual link to archive
            buttonText: 'View Archive',
        },
        {
            id: 2,
            title: 'Media Kit Download',
            description: 'Download our comprehensive media kit, including logos, brand guidelines, and high-resolution images.',
            icon: <FaDownload className="text-3xl text-accent" />,
            link: '#', // Replace with actual link to media kit zip file
            buttonText: 'Download Kit',
        },
        {
            id: 3,
            title: 'Interview Requests',
            description: 'For interview opportunities with our team, please contact our PR department.',
            icon: <FaMicrophoneAlt className="text-3xl text-accent" />,
            link: 'mailto:press@tasktogether.com?subject=Interview Request', // Replace with actual press email
            buttonText: 'Request Interview',
        },
    ];

    return (
        <div className="container mx-auto p-4 py-8">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold text-center text-primary mb-12 sm:text-6xl lg:text-7xl"
            >
                Press & Media
            </motion.h1>

            <p className="text-center text-lg text-base-content max-w-2xl mx-auto mb-10">
                Welcome to the TaskTogether Press Room. Here you'll find resources for journalists, bloggers,
                and media professionals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pressKitItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-base-100 shadow-xl rounded-lg p-6 border border-base-300 dark:border-gray-700 flex flex-col items-center text-center"
                    >
                        <div className="mb-4">
                            {item.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-secondary mb-2">{item.title}</h2>
                        <p className="text-base text-base-content leading-relaxed mb-6">{item.description}</p>
                        <div className="mt-auto w-full"> {/* Pushes button to bottom */}
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary w-full">
                                {item.buttonText}
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Press;