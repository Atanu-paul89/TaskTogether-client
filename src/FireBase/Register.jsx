// Pages/Register.jsx
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router'; 
import { AuthContext } from '../FireBase/AuthContext';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';


const Register = () => {
    const { createUser, googlelogin, loading, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [registerError, setRegisterError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError('');
        setPasswordError('');

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photoURL = form.get('photoURL');
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');
        const phoneNumber = form.get('phoneNumber');

        // --- Client-side validation ---
        if (!name || !photoURL || !email || !phoneNumber || !password || !confirmPassword) {
            setRegisterError('All fields are required. Please fill them out.');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, and one lowercase letter.');
            return;
        }
        // --- End client-side validation ---

        try {

            await createUser(email, password, name, photoURL);
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            console.error("Registration Error:", error.message);
            const errorMessage = error.message.includes('auth/')
                ? error.message.split('auth/')[1].replace(/-/g, ' ').replace(/\.$/, '')
                : error.message;
            setRegisterError(errorMessage);
            toast.error(`Registration Failed: ${errorMessage}`);
        }
    };

    const handleGoogleRegister = async () => {
        setRegisterError('');
        try {
            await googlelogin();
            toast.success('Registered and logged in with Google successfully!');
            navigate('/');
        } catch (error) {
            console.error("Google Registration Error:", error.message);
            const errorMessage = error.message.includes('auth/')
                ? error.message.split('auth/')[1].replace(/-/g, ' ').replace(/\.$/, '')
                : error.message;
            setRegisterError(errorMessage);
            toast.error(`Google Registration Failed: ${errorMessage}`);
        }
    };

    if (user) {
        navigate('/');
        return null;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
            <motion.div
                className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold text-center text-primary mb-6">Join TaskTogether</h2>

                    {registerError && (
                        <div role="alert" className="alert alert-error mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{registerError}</span>
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <motion.div variants={itemVariants} className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                className="input input-bordered w-full text-base-content"
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">Photo URL</span>
                            </label>
                            <input
                                type="url"
                                name="photoURL"
                                placeholder="Link to your profile picture"
                                className="input input-bordered w-full text-base-content"
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your email"
                                className="input input-bordered w-full text-base-content"
                                required
                            />
                        </motion.div>


                        <motion.div variants={itemVariants} className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Your phone number"
                                className="input input-bordered w-full text-base-content"
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                className={`input input-bordered w-full text-base-content ${passwordError ? 'input-error' : ''}`}
                                required
                            />
                            {passwordError && <span className="text-error text-sm mt-1">{passwordError}</span>}
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                className={`input input-bordered w-full text-base-content ${passwordError ? 'input-error' : ''}`}
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    'Register'
                                )}
                            </button>
                        </motion.div>
                    </form>

                    <div className="divider text-base-content">OR</div>

                    <div className="form-control">
                        <button
                            onClick={handleGoogleRegister}
                            className="btn btn-outline btn-info w-full flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            <FcGoogle className="text-2xl" /> Register with Google
                        </button>
                    </div>

                    <p className="text-center text-base-content mt-4">
                        Already have an account? <NavLink to="/login" className="link link-primary">Login</NavLink>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;