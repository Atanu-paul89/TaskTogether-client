// src/components/ShareComponents/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // In a real application, you would send this data to a backend endpoint
        // For now, we'll just simulate a successful submission.
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Contact form submitted:', formData);
            toast.success('Your message has been sent successfully!');
            setFormData({ name: '', email: '', message: '' }); // Clear form
        } catch (error) {
            console.error('Error submitting contact form:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 py-8">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold text-center text-primary mb-12 sm:text-6xl lg:text-7xl"
            >
                Contact Us
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-secondary mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Name</span></label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                className="input input-bordered w-full"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Email</span></label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Message</span></label>
                            <textarea
                                name="message"
                                placeholder="Type your message here..."
                                className="textarea textarea-bordered h-32 w-full"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                {loading ? <span className="loading loading-spinner"></span> : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-secondary mb-6">Our Contact Info</h2>
                    <div className="space-y-4 text-base-content">
                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-primary text-2xl" />
                            <p className="text-lg">123 Assignment Pro Lane, Taskville, TX 78901</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-primary text-2xl" />
                            <p className="text-lg">info@tasktogether.com</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-primary text-2xl" />
                            <p className="text-lg">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-accent mb-4">Business Hours</h3>
                        <p className="text-lg text-base-content">Monday - Friday: 9:00 AM - 5:00 PM (GMT+6)</p>
                        <p className="text-lg text-base-content">Saturday: 10:00 AM - 2:00 PM</p>
                        <p className="text-lg text-base-content">Sunday: Closed</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;