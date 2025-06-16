import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../FireBase/AuthContext'; 

const TakeAssignment = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { user, loading: authLoading } = useContext(AuthContext); 

    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const backendUrl = "https://tasktogether-server.vercel.app"; 

    useEffect(() => {
        const fetchAssignmentDetails = async () => {
            try {
                const response = await axios.get(`${backendUrl}/assignments/${id}`);
                setAssignment(response.data);
            } catch (err) {
                console.error("Error fetching assignment for submission:", err);
                setError("Failed to load assignment details for submission.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAssignmentDetails();
        } else {
            setLoading(false);
            setError("No assignment ID provided.");
        }
    }, [id]);

    const onSubmit = async (data) => {
        if (!user) {
            toast.error("You must be logged in to submit an assignment.");
            return;
        }

        setSubmissionLoading(true);
        try {
            const submissionData = {
                assignmentId: id,
                assignmentTitle: assignment.title, 
                originalMarks: assignment.marks,  
                submitterEmail: user.email,
                submitterName: user.displayName || user.email, 
                submissionLink: data.submissionLink,
                quickNote: data.quickNote,
                status: 'pending', 
            };

            const response = await axios.post(`${backendUrl}/submitted-assignments`, submissionData);
            toast.success(response.data.message);
            reset(); 
            navigate('/mysubmission'); 

        } catch (err) {
            console.error("Error submitting assignment:", err);
            const errorMessage = err.response?.data?.message || "Failed to submit assignment. Please try again.";
            toast.error(errorMessage);
        } finally {
            setSubmissionLoading(false);
        }
    };

    const pageVariants = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    if (loading || authLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-error mt-10 text-xl">{error}</div>;
    }

    if (!user) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 text-center">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-bold text-center text-primary mb-6 justify-center">Access Denied</h2>
                        <p className="text-base-content mb-4">
                            You must be logged in to submit an assignment.
                        </p>
                        <button onClick={() => navigate('/login')} className="btn btn-primary">Login Now</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!assignment) {
        return <div className="text-center text-info mt-10 text-xl">Assignment not found.</div>;
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
                    <h2 className="card-title text-3xl font-bold text-primary mb-6 text-left">
                        Submit: {assignment.title}
                    </h2>
                    <p className="text-lg mb-4 text-left">
                        <span className="font-semibold">Original Marks:</span> {assignment.marks}
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Assignment ID - Hidden field */}
                        <input
                            type="hidden"
                            {...register('assignmentId')}
                            value={id}
                        />
                        {/* Submitter Email - Hidden field */}
                        <input
                            type="hidden"
                            {...register('submitterEmail')}
                            value={user.email}
                        />
                         {/* Submitter Name - Hidden field */}
                         <input
                            type="hidden"
                            {...register('submitterName')}
                            value={user.displayName || user.email}
                        />

                        {/* Submission Link (PDF/Doc URL) */}
                        <div className="form-control text-left">
                            <label className="label">
                                <span className="label-text">PDF/Doc Link (Google Drive/Docs URL)</span>
                            </label>
                            <input
                                type="url"
                                placeholder="https://docs.google.com/document/d/..."
                                className={`input input-bordered w-full ${errors.submissionLink ? 'input-error' : ''}`}
                                {...register('submissionLink', {
                                    required: 'Submission link is required',
                                    pattern: {
                                        value: /^(https?:\/\/(?:www\.)?(?:docs\.google\.com|drive\.google\.com)\/document\/d\/|https?:\/\/(?:www\.)?(?:drive\.google\.com)\/file\/d\/|https?:\/\/(?:www\.)?(?:drive\.google\.com)\/open\?id=)[a-zA-Z0-9_-]+(?:[\/?].*)?$/,
                                        message: 'Please enter a valid Google Docs/Drive URL'
                                    }
                                })}
                            />
                            {errors.submissionLink && <p className="text-error text-sm mt-1">{errors.submissionLink.message}</p>}
                        </div>

                        {/* Quick Note */}
                        <div className="form-control text-left">
                            <label className="label">
                                <span className="label-text">Quick Note (Optional)</span>
                            </label>
                            <textarea
                                placeholder="Any quick notes for the grader..."
                                className="textarea textarea-bordered h-24 w-full"
                                {...register('quickNote')}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-6"
                            disabled={submissionLoading}
                        >
                            {submissionLoading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Submitting...
                                </>
                            ) : (
                                'Submit Assignment'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default TakeAssignment;