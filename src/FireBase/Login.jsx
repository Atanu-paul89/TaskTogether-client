
// import React, { useContext, useState } from 'react';
// import { NavLink, useNavigate, useLocation } from 'react-router';
// import { AuthContext } from '../FireBase/AuthContext'; AuthContext
// import { toast } from 'react-toastify';
// import { FcGoogle } from 'react-icons/fc'; 

// const Login = () => {
//     const { loginUser, googlelogin, loading } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || '/';

//     const [loginError, setLoginError] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoginError('');

//         const form = new FormData(e.currentTarget);
//         const email = form.get('email');
//         const password = form.get('password');

//         if (!email || !password) {
//             setLoginError('Please enter both email and password.');
//             return;
//         }

//         try {
//             await loginUser(email, password);
//             toast.success('Logged in successfully!');
//             navigate(from, { replace: true });
//         } catch (error) {
//             console.error("Login Error:", error.message);
//             const errorMessage = error.message.includes('auth/')
//                 ? error.message.split('auth/')[1].replace(/-/g, ' ').replace(/\.$/, '')
//                 : error.message;
//             setLoginError(errorMessage);
//             toast.error(`Login Failed: ${errorMessage}`);
//         }
//     };

//     const handleGoogleLogin = async () => {
//         setLoginError('');
//         try {
//             await googlelogin();
//             toast.success('Logged in with Google successfully!');
//             navigate(from, { replace: true });
//         } catch (error) {
//             console.error("Google Login Error:", error.message);
//             const errorMessage = error.message.includes('auth/')
//                 ? error.message.split('auth/')[1].replace(/-/g, ' ').replace(/\.$/, '')
//                 : error.message;
//             setLoginError(errorMessage);
//             toast.error(`Google Login Failed: ${errorMessage}`);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
//                 <span className="loading loading-spinner loading-lg text-primary"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
//             <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
//                 <div className="card-body">
//                     <h2 className="card-title text-3xl font-bold text-center text-primary mb-6">Login Now!</h2>

//                     {loginError && (
//                         <div role="alert" className="alert alert-error mb-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                             <span>{loginError}</span>
//                         </div>
//                     )}

//                     <form onSubmit={handleLogin}>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text text-base-content">Email</span> {/* Changed from text-neutral-content */}
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Your email"
//                                 className="input input-bordered w-full text-base-content" // Ensure input text is visible
//                                 required
//                             />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text text-base-content">Password</span> {/* Changed from text-neutral-content */}
//                             </label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Your password"
//                                 className="input input-bordered w-full text-base-content" // Ensure input text is visible
//                                 required
//                             />
//                             <label className="label">
//                                 <a href="#" className="label-text-alt link link-hover text-base-content">Forgot password?</a> {/* Changed from text-neutral-content */}
//                             </label>
//                         </div>
//                         <div className="form-control mt-6">
//                             <button type="submit" className="btn btn-primary w-full" disabled={loading}>
//                                 {loading ? (
//                                     <span className="loading loading-spinner"></span>
//                                 ) : (
//                                     'Login'
//                                 )}
//                             </button>
//                         </div>
//                     </form>

//                     <div className="divider text-base-content">OR</div> {/* Changed from text-neutral-content */}

//                     <div className="form-control">
//                         <button
//                             onClick={handleGoogleLogin}
//                             className="btn btn-outline btn-info w-full flex items-center justify-center gap-2"
//                             disabled={loading}
//                         >
//                             <FcGoogle className="text-2xl" /> Login with Google
//                         </button>
//                     </div>

//                     <p className="text-center text-base-content mt-4"> {/* Changed from text-neutral-content */}
//                         Don't have an account? <NavLink to="/register" className="link link-primary">Register</NavLink>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

// new code with forgot pass // 
import React, { useContext, useState } from 'react'; // useRef is removed as it's no longer needed
import { NavLink, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../FireBase/AuthContext';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    // AuthContext now correctly includes resetPassword as confirmed in your AuthProvider.jsx
    const { loginUser, googlelogin, loading, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [loginError, setLoginError] = useState('');
    // showResetModal and resetEmail states are removed as the modal is gone.

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        if (!email || !password) {
            setLoginError('Please enter both email and password.');
            return;
        }

        try {
            await loginUser(email, password);
            toast.success('Logged in successfully!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Login Error:", error.message);
            const errorMessage = error.message.includes('auth/')
                ? error.message.split('auth/')[1].replace(/-/g, ' ').replace(/\.$/, '')
                : error.message;
            setLoginError(errorMessage);
            toast.error(`Login Failed: ${errorMessage}`);
        }
    };

    const handleGoogleLogin = async () => {
        setLoginError('');
        try {
            await googlelogin();
            toast.success('Logged in with Google successfully!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Google Login Error:", error.message);
            const errorMessage = error.message.includes('auth/')
                ? error.message.split('auth/')[1].replace(/-/g, ' ').replace(/\.$/, '')
                : error.message;
            setLoginError(errorMessage);
            toast.error(`Google Login Failed: ${errorMessage}`);
        }
    };

    // --- This function handles the password reset without a modal ---
    const handleForgotClick = async () => {
        setLoginError(''); // Clear any general login errors
        
        // Use a browser prompt to get the user's email
        const email = prompt("Please enter your email address to reset your password:");

        if (email) { // Check if the user entered something and didn't click cancel
            try {
                await resetPassword(email); // Call the resetPassword function from AuthContext
                toast.success('Password reset email sent! Check your inbox.');
            } catch (error) {
                console.error("Password Reset Error:", error.message);
                const errorMessage = error.message.includes('auth/')
                    ? error.message.split('auth/')[1].replace(/-/g, ' ').replace(/\.$/, '')
                    : error.message;
                toast.error(`Password Reset Failed: ${errorMessage}`);
            }
        } else if (email === "") {
            // User submitted an empty string
            toast.warn("Email address cannot be empty for password reset.");
        } else {
            // User clicked cancel on the prompt
            toast.info("Password reset cancelled.");
        }
    };
    // --- End of password reset function ---

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold text-center text-primary mb-6">Login Now!</h2>

                    {loginError && (
                        <div role="alert" className="alert alert-error mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{loginError}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="form-control">
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
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base-content">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Your password"
                                className="input input-bordered w-full text-base-content"
                                required
                            />
                            <label className="label">
                                {/* The "Forgot password?" link now directly triggers the prompt */}
                                <a
                                    onClick={handleForgotClick}
                                    className="label-text-alt link link-hover text-base-content cursor-pointer"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="divider text-base-content">OR</div>

                    <div className="form-control">
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-outline btn-info w-full flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            <FcGoogle className="text-2xl" /> Login with Google
                        </button>
                    </div>

                    <p className="text-center text-base-content mt-4">
                        Don't have an account? <NavLink to="/register" className="link link-primary">Register</NavLink>
                    </p>
                </div>
            </div>

            {/* !!! The entire modal JSX has been removed from here !!! */}
            {/* There should be no conditional rendering for showResetModal now */}
        </div>
    );
};

export default Login;