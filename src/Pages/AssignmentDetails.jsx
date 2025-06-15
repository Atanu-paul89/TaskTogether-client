import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router'; 
import { motion } from 'framer-motion';
import { AuthContext } from '../FireBase/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
console.log(motion);
const AssignmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading: authLoading } = useContext(AuthContext);

    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignmentDetails = async () => {
            setLoading(true);
            setError(null);
            try {

                const response = await fetch(`https://a11-task-together-server.vercel.app/assignments/${id}`);

                if (!response.ok) {
                    let errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setAssignment(data);
            } catch (err) {
                console.error('Error fetching assignment details:', err);
                setError(`Failed to load assignment details: ${err.message}`);
                if (err.message.includes('not found') || err.message.includes('Invalid assignment ID')) {
                    toast.error("Assignment not found or invalid ID.");
                    navigate('/assignments');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAssignmentDetails();
        }
    }, [id, navigate]);
    const handleDelete = () => {
        
        if (!user || user.email !== assignment.creatorEmail) {
            Swal.fire('Permission Denied', 'You can only delete assignments you created.', 'error');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                   

                    const response = await fetch(`https://a11-task-together-server.vercel.app/assignments/${assignment._id}?creatorEmail=${user.email}`, {
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
                    navigate('/assignments'); 
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
        });
    };


    const handleTakeAssignment = () => {
        if (!user) { 
            Swal.fire({
                title: 'You are not logged in!',
                text: 'You need to log in to take this assignment.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now',
                cancelButtonText: 'Not Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login'); 
                }
            });
            return;
        }

        navigate(`/take-assignment/${assignment._id}`);
    };


    if (loading || authLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)] text-error font-semibold text-center p-4">
                {error}
            </div>
        );
    }

    if (!assignment) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)] text-gray-500">
                Assignment data could not be loaded.
            </div>
        );
    }

    const isCreator = user && user.email === assignment.creatorEmail;

    return (
        <div className="container mx-auto p-4 py-8 min-h-[calc(100vh-200px)]">
            <motion.div
                className="card lg:card-side bg-base-100 shadow-xl border border-base-300 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <figure className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                    <img
                        src={assignment.thumbnail}
                        alt={assignment.title}
                        className="w-full h-full object-cover"
                    />
                </figure>
                <div className="card-body lg:w-1/2 p-6">
                    <h2 className="card-title text-3xl font-bold text-primary mb-3">
                        {assignment.title}
                    </h2>
                    <p className="text-base-content text-lg mb-4">{assignment.description}</p>
                    <p className="text-base-content text-md">
                        <span className="font-semibold">Marks:</span> {assignment.marks}
                    </p>
                    <p className="text-base-content text-md mb-2">
                        <span className="font-semibold">Difficulty:</span>{' '}
                        <span className={`badge ${
                            assignment.difficulty === 'easy' ? 'badge-success' :
                            assignment.difficulty === 'medium' ? 'badge-warning' :
                            'badge-error'
                        } text-white font-bold text-sm`}>
                            {assignment.difficulty.charAt(0).toUpperCase() + assignment.difficulty.slice(1)}
                        </span>
                    </p>
                    <p className="text-base-content text-md mb-4">
                        <span className="font-semibold">Due Date:</span> {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-base-content text-sm mb-6">
                        <span className="font-semibold">Created By:</span> {assignment.creatorName} ({assignment.creatorEmail})
                    </p>

                    <div className="card-actions justify-end mt-auto gap-3">
                        {isCreator ? (
                            <>
                                {/* Creator's options */}
                                <button
                                    onClick={() => navigate(`/update-assignment/${assignment._id}`)}
                                    className="btn btn-warning"
                                >
                                    Edit Assignment
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="btn btn-error"
                                >
                                    Delete Assignment
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Other user's option */}
                                <button
                                    onClick={handleTakeAssignment}
                                    className="btn btn-primary"
                                >
                                    Take Assignment
                                </button>
                            </>
                        )}
                        <Link to="/assignments" className="btn btn-outline">
                            Back to All Assignments
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AssignmentDetails;