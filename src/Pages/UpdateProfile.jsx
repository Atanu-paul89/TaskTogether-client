import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../FireBase/AuthContext';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider, getAuth } from 'firebase/auth';

const UpdateProfile = () => {

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

            const firebaseAuth = getAuth(); 

            if (user && (displayName !== user.displayName || photoURL !== user.photoURL)) {
                await updateProfile(firebaseAuth.currentUser, {
                    displayName: displayName,
                    photoURL: photoURL
                });
                profileUpdateSuccessful = true;

            }


            if (newPassword) { 
                if (!currentPassword) {
                    toast.error('Please provide your current password to update your new password.');
                    setIsUpdating(false);
                    return;
                }

                try {

                    const credential = EmailAuthProvider.credential(user.email, currentPassword);
                    await reauthenticateWithCredential(firebaseAuth.currentUser, credential); 

                    await updatePassword(firebaseAuth.currentUser, newPassword); 
                    passwordUpdateSuccessful = true;
                    toast.success('Password updated successfully!');
                    reset({ newPassword: '', currentPassword: '' }); 
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

                                toast.info("Please log in again to update your password.");
                            }
                        });
                    } else {
                        toast.error(`Failed to update password: ${pwdError.message}`);
                    }
                    setIsUpdating(false); 
                    return; 
                }
            }

            if (profileUpdateSuccessful) {
                await reloadAndSetUser(); 
                toast.success('Profile (name & photo) updated successfully!');
            }

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

                    <h2 className="card-title text-3xl font-bold text-primary mb-6 text-left">Update Profile</h2>

                    <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">
                        {/* Display Name */}
                        <div className="form-control text-left"> 
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
                        <div className="form-control text-left"> 
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

                        {/* Current Password  */}
                        <div className="form-control text-left"> 
                            <label className="label">
                                <span className="label-text">Current Password </span>
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
                        <div className="form-control text-left"> 
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