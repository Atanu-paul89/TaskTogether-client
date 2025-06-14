// src/Pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion'; // For animations as required
import { Link } from 'react-router';

const Home = () => {
    return (
        <div className="home-page">
            {/* Banner Section */}
            <section className="relative w-full mt-3 rounded-2xl h-[500px] bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-center text-white p-4 overflow-hidden">
                <div className="absolute inset-0">
                    {/* Placeholder for background image or patterns */}
                    <img
                        src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzIyNzh8MHwxfHNlYXJjaHw0OHx8Z3JvdXAlMjBzdHVkeXxlbnwwfHx8fDE3MDkwMTQ4MjJ8MA&ixlib=rb-4.0.3&q=80&w=1080"
                        alt="Group Study Banner"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                        TaskTogether
                    </h1>
                    <p className="text-xl md:text-2xl font-light mb-6">
                        Providing reliable group study solutions since 2024. Unite, Learn, Succeed.
                    </p>
                    <Link to={'/assignments'}>
                       <button className="btn btn-neutral btn-lg text-primary-content hover:scale-105 transition-transform">
                        Explore Assignments
                    </button>
                    </Link>
                 
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-base-200">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-primary mb-12"
                    >
                        Key Features
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="card bg-base-100 shadow-lg p-6 rounded-lg"
                        >
                            <div className="text-primary text-5xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold text-base-content mb-2">Create & Share Assignments</h3>
                            <p className="text-base-content opacity-80">
                                Easily create assignments with specific details, marks, and due dates, and share them with your study group. 
                            </p>
                        </motion.div>
                        {/* Feature Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="card bg-base-100 shadow-lg p-6 rounded-lg"
                        >
                            <div className="text-primary text-5xl mb-4">✍️</div>
                            <h3 className="text-xl font-semibold text-base-content mb-2">Effortless Submission</h3>
                            <p className="text-base-content opacity-80">
                                Submit your completed assignments with a Google Docs link and quick notes through an intuitive form. 
                            </p>
                        </motion.div>
                        {/* Feature Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="card bg-base-100 shadow-lg p-6 rounded-lg"
                        >
                            <div className="text-primary text-5xl mb-4">✅</div>
                            <h3 className="text-xl font-semibold text-base-content mb-2">Peer Grading & Feedback</h3>
                            <p className="text-base-content opacity-80">
                                Grade assignments submitted by your friends and provide constructive feedback to help them improve. 
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-base-100">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-center text-primary mb-12"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="collapse collapse-arrow bg-base-200 mb-4">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium text-base-content">
                                How can I create an assignment?
                            </div>
                            <div className="collapse-content text-base-content opacity-80">
                                <p>
                                    Any logged-in user can navigate to the "Create Assignment" page from the navbar, fill out the assignment details (title, description, marks, thumbnail, difficulty, due date), and submit it. 
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200 mb-4">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium text-base-content">
                                Can I update or delete assignments created by others?
                            </div>
                            <div className="collapse-content text-base-content opacity-80">
                                <p>
                                    By default, any user can update any assignment. However, deletion is restricted: only the user who created an assignment can delete it. 
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium text-base-content">
                                How do I submit an assignment?
                            </div>
                            <div className="collapse-content text-base-content opacity-80">
                                <p>
                                    On the "Assignments" page, click "View Assignment" for any assignment. On the details page, click "Take Assignment" to open a submission form where you can provide a Google Docs link and a quick note. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;