import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../FireBase/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
console.log(motion);

const MySubmission = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [mySubmittedAssignments, setMySubmittedAssignments] = useState([]);
    const [myPostedAssignments, setMyPostedAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('submitted'); 


    const fetchMySubmissions = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/submitted-assignments/my-submitted-assignments?email=${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                let errorMsg = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch (jsonError) {
                    console.error("Failed to parse JSON error from submissions API:", jsonError);
                    errorMsg = `Failed to parse error response. Server returned: ${response.statusText}. Likely a non-JSON response (e.g., HTML error page).`;
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            setMySubmittedAssignments(data);
        } catch (err) {
            console.error('Error fetching my submissions:', err);
            setError(`Failed to load your submitted assignments: ${err.message}`);
            toast.error(`Error loading submissions: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch posted assignments
    const fetchMyPostedAssignments = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/assignments/my-posted-assignments?email=${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                let errorMsg = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch (jsonError) {
                    console.error("Failed to parse JSON error from posted assignments API:", jsonError);
                    errorMsg = `Failed to parse error response. Server returned: ${response.statusText}. Likely a non-JSON response (e.g., HTML error page).`;
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            setMyPostedAssignments(data);
        } catch (err) {
            console.error('Error fetching my posted assignments:', err);
            setError(`Failed to load your posted assignments: ${err.message}`);
            toast.error(`Error loading posted assignments: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        // Fetch data based on the current viewMode
        if (viewMode === 'submitted') {
            fetchMySubmissions(user.email);
        } else if (viewMode === 'posted') {
            fetchMyPostedAssignments(user.email);
        }
    }, [user?.email, viewMode]);

    // Handlers for update/delete (for My Posted Assignments)
    const handleUpdatePosted = (assignmentId) => {
        navigate(`/update-assignment/${assignmentId}`);
    };

    const handleDeletePosted = async (assignmentId) => {
        if (!user || !user.email) {
            toast.error("You must be logged in to delete assignments.");
            return;
        }

        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/assignments/${assignmentId}?creatorEmail=${user.email}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                toast.success('Assignment deleted successfully!');
                // Update the state to remove the deleted assignment
                setMyPostedAssignments(prevAssignments => prevAssignments.filter(assign => assign._id !== assignmentId));
            } catch (err) {
                console.error('Error deleting assignment:', err);
                toast.error(`Failed to delete assignment: ${err.message}`);
                Swal.fire(
                    'Failed!',
                    `Your assignment could not be deleted: ${err.message}`,
                    'error'
                );
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)] text-warning font-semibold">
                Please log in to view your work.
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

    return (
        <div className="container mx-auto p-4 py-8">
            {/* Dropdown for view mode */}
            <div className="flex justify-center mb-8">
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">
                        {viewMode === 'submitted' ? 'My Submitted Assignments' : 'My Posted Assignments'}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a onClick={() => setViewMode('submitted')}>My Submitted Assignments</a></li>
                        <li><a onClick={() => setViewMode('posted')}>My Posted Assignments</a></li>
                    </ul>
                </div>
            </div>

            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center text-primary mb-8"
            >
                {viewMode === 'submitted' ? 'My Submitted Assignments' : 'My Posted Assignments'}
            </motion.h1>

            <AnimatePresence mode="wait">
                {viewMode === 'submitted' && (
                    <motion.div
                        key="submitted-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {mySubmittedAssignments.length === 0 ? (
                            <div className="text-center text-lg text-gray-500 mt-10 min-h-[calc(100vh-350px)] flex flex-col justify-center items-center">
                                <p>You haven't submitted any assignments yet.</p>
                                <p className="mt-2">Go to the <Link to="/assignments" className="text-info hover:underline">Assignments page</Link> to take one!</p>
                            </div>
                        ) : (
                            <>
                                {/* Table for larger devices (sm breakpoint and up) */}
                                {/* This table will be visible on 'sm' (640px) and wider screens. */}
                                {/* hidden: Hides the element by default. */}
                                {/* sm:block: Makes the element a block-level element on 'sm' (640px) and wider screens. */}
                                <div className="overflow-x-auto rounded-lg shadow-xl border border-base-300 dark:border-gray-700 hidden sm:block">
                                    <table className="table w-full text-base-content">
                                        <thead>
                                            <tr className="bg-base-200 text-lg">
                                                <th>Assignment Title</th>
                                                <th>Original Marks</th>
                                                <th>Obtained Marks</th>
                                                <th>Status</th>
                                                <th>Feedback</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mySubmittedAssignments.map((submission) => (
                                                <motion.tr
                                                    key={submission._id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.4, delay: 0.1 * mySubmittedAssignments.indexOf(submission) }}
                                                    className="hover:bg-base-300"
                                                >
                                                    <td className="font-semibold">{submission.assignmentTitle}</td>
                                                    <td>{submission.originalMarks}</td>
                                                    <td>{submission.obtainedMarks || 'N/A'}</td>
                                                    <td>
                                                        <span className={`badge ${
                                                            submission.status === 'pending' ? 'badge-warning' : 'badge-success'
                                                        } text-white font-bold`}>
                                                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td>{submission.feedback || 'No feedback yet.'}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Card-like display for smaller devices (below sm breakpoint) */}
                                {/* This div will be hidden on 'sm' (640px) and wider screens. */}
                                {/* sm:hidden: Hides the element on 'sm' (640px) and wider screens. */}
                                {/* grid grid-cols-1 gap-4: Ensures a single column grid layout with spacing for cards on small screens. */}
                                <div className="grid grid-cols-1 gap-4 sm:hidden">
                                    {mySubmittedAssignments.map((submission) => (
                                        <motion.div
                                            key={submission._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.1 * mySubmittedAssignments.indexOf(submission) }}
                                            className="card bg-base-100 shadow-xl border border-base-300 dark:border-gray-700 p-4"
                                        >
                                            <div className="mb-2">
                                                <span className="font-semibold text-primary">Assignment Title:</span> {submission.assignmentTitle}
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-semibold">Original Marks:</span> {submission.originalMarks}
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-semibold">Obtained Marks:</span> {submission.obtainedMarks || 'N/A'}
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-semibold">Status:</span>{' '}
                                                <span className={`badge ${
                                                    submission.status === 'pending' ? 'badge-warning' : 'badge-success'
                                                } text-white font-bold`}>
                                                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-semibold">Feedback:</span> {submission.feedback || 'No feedback yet.'}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>
                )}

                {viewMode === 'posted' && (
                    <motion.div
                        key="posted-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {myPostedAssignments.length === 0 ? (
                            <div className="text-center text-lg text-gray-500 mt-10 min-h-[calc(100vh-350px)] flex flex-col justify-center items-center">
                                <p>You haven't posted any assignments yet.</p>
                                <p className="mt-2">Go to the <Link to="/create-assignment" className="text-info hover:underline">Create Assignment page</Link> to post one!</p>
                            </div>
                        ) : (
                            <>
                                {/* Table for larger devices (sm breakpoint and up) for Posted Assignments */}
                                {/* This table will be visible on 'sm' (640px) and wider screens. */}
                                {/* hidden: Hides the element by default. */}
                                {/* sm:block: Makes the element a block-level element on 'sm' (640px) and wider screens. */}
                                <div className="overflow-x-auto rounded-lg shadow-xl border border-base-300 dark:border-gray-700 hidden sm:block">
                                    <table className="table w-full text-base-content">
                                        <thead>
                                            <tr className="bg-base-200 text-lg">
                                                <th>Assignment Title</th>
                                                <th>Marks</th>
                                                <th>Difficulty</th>
                                                <th>Due Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myPostedAssignments.map((assignment) => (
                                                <motion.tr
                                                    key={assignment._id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.4, delay: 0.1 * myPostedAssignments.indexOf(assignment) }}
                                                    className="hover:bg-base-300"
                                                >
                                                    <td className="font-semibold">{assignment.title}</td>
                                                    <td>{assignment.marks}</td>
                                                    <td>
                                                        <span className={`badge ${
                                                            assignment.difficulty === 'easy' ? 'badge-success' :
                                                            assignment.difficulty === 'medium' ? 'badge-warning' :
                                                            'badge-error'
                                                        } text-white font-bold`}>
                                                            {assignment.difficulty.charAt(0).toUpperCase() + assignment.difficulty.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                                                    <td className="flex gap-2">
                                                        <button
                                                            onClick={() => handleUpdatePosted(assignment._id)}
                                                            className="btn btn-sm btn-info text-white"
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeletePosted(assignment._id)}
                                                            className="btn btn-sm btn-error text-white"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Card-like display for smaller devices (below sm breakpoint) for Posted Assignments */}
                                {/* This div will be hidden on 'sm' (640px) and wider screens. */}
                                {/* sm:hidden: Hides the element on 'sm' (640px) and wider screens. */}
                                {/* grid grid-cols-1 gap-4: Ensures a single column grid layout with spacing for cards on small screens. */}
                                <div className="grid grid-cols-1 gap-4 sm:hidden">
                                    {myPostedAssignments.map((assignment) => (
                                        <motion.div
                                            key={assignment._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.1 * myPostedAssignments.indexOf(assignment) }}
                                            className="card bg-base-100 shadow-xl border border-base-300 dark:border-gray-700 p-4"
                                        >
                                            <div className="mb-2">
                                                <span className="font-semibold text-primary">Title:</span> {assignment.title}
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-semibold">Marks:</span> {assignment.marks}
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-semibold">Difficulty:</span>{' '}
                                                <span className={`badge ${
                                                    assignment.difficulty === 'easy' ? 'badge-success' :
                                                    assignment.difficulty === 'medium' ? 'badge-warning' :
                                                    'badge-error'
                                                } text-white font-bold`}>
                                                    {assignment.difficulty.charAt(0).toUpperCase() + assignment.difficulty.slice(1)}
                                                </span>
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-semibold">Due Date:</span> {new Date(assignment.dueDate).toLocaleDateString()}
                                            </div>
                                            {/* Buttons for actions, adjusted for better mobile layout */}
                                            <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                                                <button
                                                    onClick={() => handleUpdatePosted(assignment._id)}
                                                    className="btn btn-sm btn-info text-white w-full" // w-full for full width on small screens
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePosted(assignment._id)}
                                                    className="btn btn-sm btn-error text-white w-full" // w-full for full width on small screens
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MySubmission;