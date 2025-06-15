import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaChartLine, FaUsers } from 'react-icons/fa';

const jobOpenings = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        location: 'Remote',
        type: 'Full-time',
        icon: <FaLaptopCode className="text-3xl text-accent" />,
        description: 'We are seeking an experienced Frontend Developer to lead our UI/UX initiatives using React and Next.js.',
        requirements: ['5+ years React experience', 'Strong HTML/CSS/JS', 'Next.js proficiency', 'UI/UX focus'],
    },
    {
        id: 2,
        title: 'Backend Engineer (Node.js)',
        location: 'Chittagong, Bangladesh',
        type: 'Full-time',
        icon: <FaChartLine className="text-3xl text-accent" />,
        description: 'Join our backend team to build scalable APIs and maintain our MongoDB database. Expertise in Node.js and Express.js required.',
        requirements: ['3+ years Node.js experience', 'MongoDB', 'RESTful API design', 'Cloud deployment'],
    },
    {
        id: 3,
        title: 'Community Manager',
        location: 'Remote',
        type: 'Part-time',
        icon: <FaUsers className="text-3xl text-accent" />,
        description: 'Engage with our user community, manage social media, and gather feedback to improve our platform.',
        requirements: ['Excellent communication', 'Social media savvy', 'Customer service mindset', 'Passion for education'],
    },
];

const Jobs = () => {
    return (
        <div className="container mx-auto p-4 py-8">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold text-center text-primary mb-12 sm:text-6xl lg:text-7xl"
            >
                Career Opportunities
            </motion.h1>

            {jobOpenings.length === 0 ? (
                <div className="text-center text-lg text-gray-500 mt-10">
                    <p>No job openings at the moment. Please check back later!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {jobOpenings.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-base-100 shadow-xl rounded-lg p-6 border border-base-300 dark:border-gray-700 flex flex-col items-center text-center"
                        >
                            <div className="mb-4">
                                {job.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-secondary mb-2">{job.title}</h2>
                            <p className="text-lg text-base-content-secondary mb-1">{job.location} &bull; {job.type}</p>
                            <p className="text-base text-base-content leading-relaxed mb-4">{job.description}</p>
                            <div className="mt-auto w-full"> {/* Pushes button to bottom */}
                                <h3 className="text-lg font-semibold text-accent mb-2">Requirements:</h3>
                                <ul className="list-disc list-inside text-sm text-base-content mb-4 text-left mx-auto max-w-xs">
                                    {job.requirements.map((req, i) => (
                                        <li key={i}>{req}</li>
                                    ))}
                                </ul>
                                <button className="btn btn-primary w-full">Apply Now</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jobs;