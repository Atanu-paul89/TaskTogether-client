import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../FireBase/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    );

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    const { user, logoutUser, loading } = useContext(AuthContext);


    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out from your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                logoutUser()
                    .then(() => {
                        toast.success(`Logged out successfully!`);
                        console.log("User logged out successfully");
                    })
                    .catch(error => {
                        toast.error(`Logout failed: ${error.message}`);
                        console.error("Error logging out:", error);
                    });
            } else {
                toast.info("Logout cancelled.");
            }
        });
    };

    const textVariants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.05 } },
        hover: { scale: 1.05, color: "hsl(var(--p))", transition: { duration: 0.2 } }
    };

    const letterVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    const siteName = "TaskTogether";
    const defaultAvatar = 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg';


    const navLinkClasses = ({ isActive }) =>
        `font-medium transition-colors duration-200 ease-in-out hover:text-primary ${isActive ? 'text-primary underline underline-offset-4' : 'text-base-content'
        }`;

    return (

        // <div className=" navbar bg-base-100 shadow-md w-full relative z-50">
        <div className=" navbar bg-base-100 shadow-md w-full sticky top-0 z-50">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn pl-0 btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    {/* Mobile/Dropdown Menu */}
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
                        <li><NavLink to="/assignments" className={navLinkClasses}>Assignments</NavLink></li>
                        {user && (
                            <>
                                <li><NavLink to="/createAssignments" className={navLinkClasses}>Create</NavLink></li>
                                <li><NavLink to="/mysubmission" className={navLinkClasses}>My Work</NavLink></li>
                                <li><NavLink to="/pendingAssignments" className={navLinkClasses}>Pending</NavLink></li>
                                <li><NavLink to="/update-profile" className={navLinkClasses}>Update Profile</NavLink></li>
                            </>
                        )}
                        {/* More dropdown for mobile */}
                        <li>
                            <details>
                                <summary>More</summary>
                                <ul className="p-2 bg-base-100 rounded-t-none">
                                    <li><NavLink to="/about" className={navLinkClasses}>About Us</NavLink></li>
                                    <li><NavLink to="/contact" className={navLinkClasses}>Contact</NavLink></li>
                                    <li><NavLink to="/jobs" className={navLinkClasses}>Jobs</NavLink></li>
                                    <li><NavLink to="/press" className={navLinkClasses}>Press Kit</NavLink></li>
                                </ul>
                            </details>
                        </li>
                        {/* Conditional Login/Logout for mobile */}
                        {user ? (
                            <li><button onClick={handleLogout}>Logout</button></li>
                        ) : (
                            <li><NavLink to="/login" className={navLinkClasses}>Login</NavLink></li>
                        )}
                    </ul>
                </div>

                {/* Animated Website Logo */}
                <NavLink to="/" className="font-bold ml-0 lg:ml-3 text-[#605DFF] btn-ghost text-xl normal-case">
                    <motion.span
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        style={{ display: "inline-flex" }}
                    >
                        {siteName.split("").map((char, index) => (
                            <motion.span key={index} variants={letterVariants}>
                                {char}
                            </motion.span>
                        ))}
                    </motion.span>
                </NavLink>
            </div>

            {/* Navbar Center - Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
                    <li><NavLink to="/assignments" className={navLinkClasses}>Assignments</NavLink></li>
                    {user && (
                        <>
                            <li><NavLink to="/createAssignments" className={navLinkClasses}>Create</NavLink></li>
                            <li><NavLink to="/mysubmission" className={navLinkClasses}>My Work</NavLink></li>
                            <li><NavLink to="/pendingAssignments" className={navLinkClasses}>Pending</NavLink></li>
                        </>
                    )}
                    {/* "More" dropdown for desktop:Kola Kola */}
                    <li>
                        <details>
                            <summary className={navLinkClasses}>More</summary>
                            <ul className="p-2 md:w-[117px] bg-base-100 rounded-t-none" >
                                <li><NavLink to="/about" className={navLinkClasses}>About Us</NavLink></li>
                                <li><NavLink to="/contact" className={navLinkClasses}>Contact</NavLink></li>
                                <li><NavLink to="/jobs" className={navLinkClasses}>Jobs</NavLink></li>
                                <li><NavLink to="/press" className={navLinkClasses}>Press Kit</NavLink></li>
                            </ul>
                        </details> 
                    </li>
                </ul>
            </div>

            {/* Navbar End  */}
            <div className="navbar-end gap-2">
                {/* Theme Toggle */}
                <label className="swap swap-rotate text-base-content">
                    <input
                        type="checkbox"
                        className="theme-controller"
                        onChange={handleToggle}
                        checked={theme === 'dark'}
                    />
                    <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM18.36,6.34a1,1,0,0,0-1.41-1.41l-.71.71A1,1,0,0,0,17,7.05h0A1,1,0,0,0,18.36,6.34ZM12,19a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM7.05,18.36a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,7.05,18.36ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM7.05,18.36a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,7.05,18.36ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19Zm.71-15.34A1,1,0,0,0,12,2.5a1,1,0,0,0-1,.71L10.29,4A1,1,0,0,0,10.29,5.41a1,1,0,0,0,.71.29H12a1,1,0,0,0,1-.71l.71-.71A1,1,0,0,0,12.71,3.66ZM17.36,17.36a1,1,0,0,0,0,1.41l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,17.36,17.36ZM12,6a6,6,1,0,0,0,6,6A6,6,0,0,0,12,6Z" /></svg>
                    <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" /></svg>
                </label>

                {loading ? (
                    <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                ) : user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user.displayName || user.email || "User"}>
                            <div className="w-10 rounded-full">
                                <img
                                    src={user.photoURL || defaultAvatar}
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <span className="font-bold text-lg italic">{user.displayName || 'User'}</span>
                                <span className={navLinkClasses}>{user.email}</span>
                            </li>
                            <li><NavLink to="/update-profile" className={navLinkClasses}>Update Profile</NavLink></li>
     
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <NavLink to="/login" className="btn btn-primary">Login</NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;