// import React, { useEffect, useState, useContext } from 'react';
// import { motion } from 'framer-motion';
// import { AuthContext } from '../FireBase/AuthContext';
// import { useForm } from 'react-hook-form'; // Import useForm
// import Swal from 'sweetalert2';
// import { toast } from 'react-toastify';
// import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'; // Import Firebase auth methods

// const UpdateProfile = () => {
//     const { user, loading: authLoading } = useContext(AuthContext);
//     const [isUpdating, setIsUpdating] = useState(false); // State for overall update loading

//     // Initialize react-hook-form
//     const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

//     // Effect to pre-fill form fields when user data is available
//     useEffect(() => {
//         if (user && !authLoading) {
//             setValue('displayName', user.displayName || '');
//             setValue('photoURL', user.photoURL || '');
//         }
//     }, [user, authLoading, setValue]);

//     const handleUpdateProfile = async (data) => {
//         setIsUpdating(true);
//         const { displayName, photoURL, currentPassword, newPassword } = data;

//         let profileUpdateSuccessful = false;
//         let passwordUpdateSuccessful = false;

//         try {
//             // --- Update Display Name and Photo URL ---
//             if (user && (displayName !== user.displayName || photoURL !== user.photoURL)) {
//                 await updateProfile(user, {
//                     displayName: displayName,
//                     photoURL: photoURL
//                 });
//                 profileUpdateSuccessful = true;
//                 toast.success('Profile (name/photo) updated successfully!');
//             }

//             // --- Update Password ---
//             if (newPassword) { // Only attempt password update if newPassword is provided
//                 if (!currentPassword) {
//                     toast.error('Please provide your current password to update your new password.');
//                     setIsUpdating(false);
//                     return;
//                 }

//                 try {
//                     // Re-authenticate user before updating password (security measure by Firebase)
//                     const credential = EmailAuthProvider.credential(user.email, currentPassword);
//                     await reauthenticateWithCredential(user, credential);

//                     await updatePassword(user, newPassword);
//                     passwordUpdateSuccessful = true;
//                     toast.success('Password updated successfully!');
//                     reset({ newPassword: '', currentPassword: '' }); // Clear password fields on success
//                 } catch (pwdError) {
//                     console.error("Password update error:", pwdError);
//                     if (pwdError.code === 'auth/wrong-password') {
//                         toast.error('Incorrect current password.');
//                     } else if (pwdError.code === 'auth/requires-recent-login') {
//                         Swal.fire({
//                             title: 'Re-authentication Required',
//                             text: 'For security reasons, please re-login to update your password.',
//                             icon: 'warning',
//                             showCancelButton: true,
//                             confirmButtonText: 'Go to Login',
//                             cancelButtonText: 'Cancel'
//                         }).then((result) => {
//                             if (result.isConfirmed) {
//                                 // You might want to redirect to login and then back here, or trigger a modal login
//                                 // For simplicity, we'll just show a toast for now and let the user re-login manually.
//                                 toast.info("Please log in again to update your password.");
//                                 // Example: navigate('/login?redirect=/update-profile');
//                             }
//                         });
//                     } else {
//                         toast.error(`Failed to update password: ${pwdError.message}`);
//                     }
//                 }
//             }

//             // If nothing was updated, inform the user
//             if (!profileUpdateSuccessful && !passwordUpdateSuccessful && !newPassword) {
//                 toast.info('No changes detected to update.');
//             }

//         } catch (error) {
//             console.error("Error updating profile:", error);
//             toast.error(`Failed to update profile: ${error.message}`);
//         } finally {
//             setIsUpdating(false);
//         }
//     };


//     const pageVariants = {
//         initial: { opacity: 0, y: 50 },
//         animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//     };

//     if (authLoading) {
//         return (
//             <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
//                 <span className="loading loading-spinner loading-lg text-primary"></span>
//             </div>
//         );
//     }

//     if (!user) {
//         return (
//             <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
//                 <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 text-center">
//                     <div className="card-body">
//                         <h2 className="card-title text-3xl font-bold text-center text-primary mb-6 justify-center">Access Denied</h2>
//                         <p className="text-base-content mb-4">
//                             You must be logged in to view and update your profile.
//                         </p>
//                         <button onClick={() => navigate('/login')} className="btn btn-primary">Login Now</button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <motion.div
//             className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4"
//             initial="initial"
//             animate="animate"
//             variants={pageVariants}
//         >
//             <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 text-center">
//                 <div className="card-body">
//                     <h2 className="card-title text-3xl font-bold text-center text-primary mb-6 justify-center">Update Profile</h2>

//                     <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">
//                         {/* Display Name */}
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Display Name</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Your Name"
//                                 className={`input input-bordered ${errors.displayName ? 'input-error' : ''}`}
//                                 {...register('displayName', { required: 'Display Name is required' })}
//                             />
//                             {errors.displayName && <p className="text-error text-sm mt-1">{errors.displayName.message}</p>}
//                         </div>

//                         {/* Profile Picture URL */}
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Profile Picture URL</span>
//                             </label>
//                             <input
//                                 type="url"
//                                 placeholder="https://example.com/your-photo.jpg"
//                                 className={`input input-bordered ${errors.photoURL ? 'input-error' : ''}`}
//                                 {...register('photoURL', {
//                                     pattern: {
//                                         value: /^(ftp|http|https):\/\/[^ "]+$/,
//                                         message: 'Please enter a valid URL'
//                                     }
//                                 })}
//                             />
//                             {errors.photoURL && <p className="text-error text-sm mt-1">{errors.photoURL.message}</p>}
//                         </div>

//                         {/* Current Password (for re-authentication) */}
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Current Password (for password change)</span>
//                             </label>
//                             <input
//                                 type="password"
//                                 placeholder="Enter current password"
//                                 className={`input input-bordered ${errors.currentPassword ? 'input-error' : ''}`}
//                                 {...register('currentPassword')}
//                             />
//                             {errors.currentPassword && <p className="text-error text-sm mt-1">{errors.currentPassword.message}</p>}
//                         </div>

//                         {/* New Password */}
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">New Password</span>
//                             </label>
//                             <input
//                                 type="password"
//                                 placeholder="Enter new password (min 6 characters)"
//                                 className={`input input-bordered ${errors.newPassword ? 'input-error' : ''}`}
//                                 {...register('newPassword', {
//                                     minLength: {
//                                         value: 6,
//                                         message: 'Password must be at least 6 characters'
//                                     }
//                                 })}
//                             />
//                             {errors.newPassword && <p className="text-error text-sm mt-1">{errors.newPassword.message}</p>}
//                         </div>

//                         <button
//                             type="submit"
//                             className="btn btn-primary w-full mt-6"
//                             disabled={isUpdating}
//                         >
//                             {isUpdating ? (
//                                 <>
//                                     <span className="loading loading-spinner"></span>
//                                     Updating...
//                                 </>
//                             ) : (
//                                 'Update Profile'
//                             )}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default UpdateProfile;



// new code // 
import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../FireBase/AuthContext';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
// ⭐ MODIFICATION: Import Firebase auth methods directly as they are not exposed by AuthProvider for update/reauthenticate ⭐
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider, getAuth } from 'firebase/auth';

const UpdateProfile = () => {
    // ⭐ MODIFICATION: Destructure reloadAndSetUser from AuthContext ⭐
    const { user, loading: authLoading, reloadAndSetUser } = useContext(AuthContext);
    const [isUpdating, setIsUpdating] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (user && !authLoading) {
            setValue('displayName', user.displayName || '');
            setValue('photoURL', user.photoURL || '');
        }
    }, [user, authLoading, setValue]);

    const handleUpdateProfile = async (data) => {
        setIsUpdating(true);
        const { displayName, photoURL, currentPassword, newPassword } = data;

        let profileUpdateSuccessful = false;
        let passwordUpdateSuccessful = false;

        try {
            // Get the current Firebase auth instance
            const firebaseAuth = getAuth(); // This should be the same instance from firebase.config.js

            // --- Update Display Name and Photo URL ---
            // Only update if changes are detected and user is available
            if (user && (displayName !== user.displayName || photoURL !== user.photoURL)) {
                await updateProfile(firebaseAuth.currentUser, {
                    displayName: displayName,
                    photoURL: photoURL
                });
                profileUpdateSuccessful = true;
                // Toast will be shown after refresh, no toast here yet
            }

            // --- Update Password ---
            if (newPassword) { // Only attempt password update if newPassword is provided
                if (!currentPassword) {
                    toast.error('Please provide your current password to update your new password.');
                    setIsUpdating(false);
                    return;
                }

                try {
                    // Re-authenticate user before updating password (security measure by Firebase)
                    const credential = EmailAuthProvider.credential(user.email, currentPassword);
                    await reauthenticateWithCredential(firebaseAuth.currentUser, credential); // Use firebaseAuth.currentUser

                    await updatePassword(firebaseAuth.currentUser, newPassword); // Use firebaseAuth.currentUser
                    passwordUpdateSuccessful = true;
                    toast.success('Password updated successfully!');
                    reset({ newPassword: '', currentPassword: '' }); // Clear password fields on success
                } catch (pwdError) {
                    console.error("Password update error:", pwdError);
                    if (pwdError.code === 'auth/wrong-password') {
                        toast.error('Incorrect current password.');
                    } else if (pwdError.code === 'auth/requires-recent-login') {
                        Swal.fire({
                            title: 'Re-authentication Required',
                            text: 'For security reasons, please re-login to update your password.',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Go to Login',
                            cancelButtonText: 'Cancel'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // You might want to redirect to login and then back here, or trigger a modal login
                                toast.info("Please log in again to update your password.");
                            }
                        });
                    } else {
                        toast.error(`Failed to update password: ${pwdError.message}`);
                    }
                    setIsUpdating(false); // Stop loading if password update fails
                    return; // Exit function if password update failed
                }
            }

            // ⭐ MODIFICATION: Call reloadAndSetUser only if profile fields were updated ⭐
            if (profileUpdateSuccessful) {
                await reloadAndSetUser(); // This will trigger a re-render with updated user data
                toast.success('Profile (name & photo) updated successfully!');
            }


            // If nothing was updated, inform the user
            if (!profileUpdateSuccessful && !passwordUpdateSuccessful && !newPassword) {
                toast.info('No changes detected to update.');
            }

        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(`Failed to update profile: ${error.message}`);
        } finally {
            setIsUpdating(false);
        }
    };


    const pageVariants = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    if (authLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 text-center">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-bold text-center text-primary mb-6 justify-center">Access Denied</h2>
                        <p className="text-base-content mb-4">
                            You must be logged in to view and update your profile.
                        </p>
                        <button onClick={() => window.location.href = '/login'} className="btn btn-primary">Login Now</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4"
            initial="initial"
            animate="animate"
            variants={pageVariants}
        >
            <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 text-center">
                <div className="card-body">
                    {/* ⭐ MODIFICATION: Ensure card-title is left-aligned by removing justify-center if present ⭐ */}
                    <h2 className="card-title text-3xl font-bold text-primary mb-6 text-left">Update Profile</h2>

                    <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">
                        {/* Display Name */}
                        <div className="form-control text-left"> {/* ⭐ MODIFICATION: Added text-left ⭐ */}
                            <label className="label">
                                <span className="label-text">Display Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className={`input input-bordered w-full ${errors.displayName ? 'input-error' : ''}`}
                                {...register('displayName', { required: 'Display Name is required' })}
                            />
                            {errors.displayName && <p className="text-error text-sm mt-1">{errors.displayName.message}</p>}
                        </div>

                        {/* Profile Picture URL */}
                        <div className="form-control text-left"> {/* ⭐ MODIFICATION: Added text-left ⭐ */}
                            <label className="label">
                                <span className="label-text">Profile Picture URL</span>
                            </label>
                            <input
                                type="url"
                                placeholder="https://example.com/your-photo.jpg"
                                className={`input input-bordered w-full ${errors.photoURL ? 'input-error' : ''}`}
                                {...register('photoURL', {
                                    pattern: {
                                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                                        message: 'Please enter a valid URL'
                                    }
                                })}
                            />
                            {errors.photoURL && <p className="text-error text-sm mt-1">{errors.photoURL.message}</p>}
                        </div>

                        {/* Current Password (for re-authentication) */}
                        <div className="form-control text-left"> {/* ⭐ MODIFICATION: Added text-left ⭐ */}
                            <label className="label">
                                <span className="label-text">Current Password (for password change)</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                className={`input input-bordered w-full ${errors.currentPassword ? 'input-error' : ''}`}
                                {...register('currentPassword')}
                            />
                            {errors.currentPassword && <p className="text-error text-sm mt-1">{errors.currentPassword.message}</p>}
                        </div>

                        {/* New Password */}
                        <div className="form-control text-left"> {/* ⭐ MODIFICATION: Added text-left ⭐ */}
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter new password (min 6 characters)"
                                className={`input input-bordered w-full ${errors.newPassword ? 'input-error' : ''}`}
                                {...register('newPassword', {
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                            />
                            {errors.newPassword && <p className="text-error text-sm mt-1">{errors.newPassword.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-6"
                            disabled={isUpdating}
                        >
                            {isUpdating ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Updating...
                                </>
                            ) : (
                                'Update Profile'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default UpdateProfile;