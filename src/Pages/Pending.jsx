import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../FireBase/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Pending = () => {
    const { user } = useContext(AuthContext); // Get logged-in user info
    const [pendingSubmissions, setPendingSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null); // The submission being graded
    const [gradingLoading, setGradingLoading] = useState(false);
    const [gradingError, setGradingError] = useState('');

    const fetchPendingSubmissions = async () => {
        setLoading(true);
        setError(null);
        if (!user?.email) {
            setLoading(false);
            return; // No user logged in, cannot fetch private data
        }

        try {
            const response = await fetch(`http://localhost:5000/submitted-assignments/pending-assignments?graderEmail=${user.email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // Include Authorization header if your backend requires it for private routes
                    // 'Authorization': `Bearer ${user?.accessToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setPendingSubmissions(data);
        } catch (err) {
            console.error('Error fetching pending submissions:', err);
            setError(`Failed to load pending assignments: ${err.message}`);
            toast.error(`Error loading pending assignments: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingSubmissions();
    }, [user?.email]); // Re-fetch when user email changes

    const handleGiveMarkClick = (submission) => {
        // Prevent grading own assignment (frontend check, backend must also validate)
        if (user && user.email === submission.submitterEmail) {
            toast.warn("You cannot grade your own submitted assignment.");
            return;
        }
        setSelectedSubmission(submission);
        setShowModal(true);
        setGradingError(''); // Clear previous error
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedSubmission(null);
        setGradingError('');
    };

    const handleGradeSubmit = async (e) => {
        e.preventDefault();
        setGradingLoading(true);
        setGradingError('');

        const form = e.target;
        const obtainedMarks = parseInt(form.obtainedMarks.value);
        const feedback = form.feedback.value;

        if (isNaN(obtainedMarks) || obtainedMarks < 0 || obtainedMarks > selectedSubmission.originalMarks) {
            setGradingError(`Obtained marks must be a number between 0 and ${selectedSubmission.originalMarks}.`);
            setGradingLoading(false);
            return;
        }

        const gradeData = {
            obtainedMarks,
            feedback,
            status: 'completed',
            gradedBy: user?.email || 'Anonymous', // Record who graded it
            gradedAt: new Date().toISOString()
        };

        try {
            const response = await fetch(`http://localhost:5000/submitted-assignments/${selectedSubmission._id}/grade`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Include Authorization header if your backend requires it
                    // 'Authorization': `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify(gradeData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            toast.success('Assignment marked successfully!');
            handleModalClose();
            fetchPendingSubmissions(); // Re-fetch data to update the table
        } catch (err) {
            console.error('Error grading assignment:', err);
            setGradingError(`Failed to submit grade: ${err.message}`);
            toast.error(`Failed to submit grade: ${err.message}`);
        } finally {
            setGradingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)] text-error font-semibold">
                {error}
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)] text-warning font-semibold">
                Please log in to view pending assignments for grading.
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center text-primary mb-8"
            >
                Pending Assignments to Grade
            </motion.h1>

            {pendingSubmissions.length === 0 ? (
                <div className="text-center text-lg text-gray-500 mt-10 min-h-[calc(100vh-350px)] flex flex-col justify-center items-center">
                    <p>No pending assignments to grade at the moment.</p>
                </div>
            ) : (
                <>
                    {/* Table for larger devices (sm and up) */}
                    <div className="overflow-x-auto rounded-lg shadow-xl border border-base-300 dark:border-gray-700 hidden sm:block"> {/* ⭐ MODIFIED ⭐ */}
                        <table className="table w-full text-base-content">
                            {/* head */}
                            <thead>
                                <tr className="bg-base-200 text-lg">
                                    <th>Assignment Title</th>
                                    <th>Original Marks</th>
                                    <th>Examinee Name</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingSubmissions.map((submission) => (
                                    <motion.tr
                                        key={submission._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 * pendingSubmissions.indexOf(submission) }}
                                        className="hover:bg-base-300"
                                    >
                                        <td className="font-semibold">{submission.assignmentTitle}</td>
                                        <td>{submission.originalMarks}</td>
                                        <td>{submission.submitterName}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => handleGiveMarkClick(submission)}
                                                className="btn btn-primary btn-sm"
                                                // Disable if current user is the submitter
                                                disabled={user && user.email === submission.submitterEmail}
                                            >
                                                {user && user.email === submission.submitterEmail ? "Cannot Grade Own" : "Give Mark"}
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card-like display for smaller devices (below sm) */}
                    <div className="sm:hidden grid grid-cols-1 gap-4"> {/* ⭐ NEW BLOCK ⭐ */}
                        {pendingSubmissions.map((submission) => (
                            <motion.div
                                key={submission._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * pendingSubmissions.indexOf(submission) }}
                                className="card bg-base-100 shadow-xl border border-base-300 dark:border-gray-700 p-4"
                            >
                                <div className="mb-2">
                                    <span className="font-semibold text-primary">Assignment Title:</span> {submission.assignmentTitle}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Original Marks:</span> {submission.originalMarks}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Examinee Name:</span> {submission.submitterName}
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        onClick={() => handleGiveMarkClick(submission)}
                                        className="btn btn-primary btn-sm w-full"
                                        disabled={user && user.email === submission.submitterEmail}
                                    >
                                        {user && user.email === submission.submitterEmail ? "Cannot Grade Own" : "Give Mark"}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {/* Give Mark Modal (remains the same) */}
            {showModal && selectedSubmission && (
                <dialog open className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-2xl bg-base-100 shadow-xl p-6">
                        <h3 className="font-bold text-2xl text-primary mb-4">Grade Assignment: {selectedSubmission.assignmentTitle}</h3>
                        <p className="py-2 text-base-content">
                            **Examinee:** {selectedSubmission.submitterName}
                        </p>
                        <p className="py-2 text-base-content">
                            **Original Marks:** {selectedSubmission.originalMarks}
                        </p>
                        <p className="py-2 text-base-content">
                            **Submission Link:**{' '}
                            <a
                                href={selectedSubmission.submissionLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link link-info break-all"
                            >
                                {selectedSubmission.submissionLink}
                            </a>
                        </p>
                        <p className="py-2 text-base-content">
                            **Examinee's Notes:** {selectedSubmission.quickNote || 'No notes provided.'}
                        </p>

                        {gradingError && (
                            <div role="alert" className="alert alert-error my-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{gradingError}</span>
                            </div>
                        )}

                        <form onSubmit={handleGradeSubmit} className="space-y-4 mt-6">
                            <div>
                                <label className="label"><span className="label-text text-base-content">Obtained Marks</span></label>
                                <input
                                    type="number"
                                    name="obtainedMarks"
                                    placeholder={`Max: ${selectedSubmission.originalMarks}`}
                                    className="input input-bordered w-full"
                                    min="0"
                                    max={selectedSubmission.originalMarks}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label"><span className="label-text text-base-content">Feedback</span></label>
                                <textarea
                                    name="feedback"
                                    placeholder="Provide constructive feedback..."
                                    className="textarea textarea-bordered w-full h-24"
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary" disabled={gradingLoading}>
                                    {gradingLoading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        'Submit Grade'
                                    )}
                                </button>
                                <button type="button" onClick={handleModalClose} className="btn btn-ghost">Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default Pending;



