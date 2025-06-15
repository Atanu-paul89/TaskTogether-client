 import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router'; 
import { AuthContext } from '../FireBase/AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

console.log(motion);
const Assignments = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [assignments, setAssignments] = useState([]);
    const [displayedAssignments, setDisplayedAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filterDifficulty, setFilterDifficulty] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const [tempSearchTerm, setTempSearchTerm] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            setLoading(true);
            setError(null);
            try {

                const response = await fetch('https://a11-task-together-server.vercel.app/assignments');

                if (!response.ok) {
                    let errorMsg = `HTTP error! status: ${response.status}`;
                    try {
                        const errorData = await response.json();
                        errorMsg = errorData.message || errorMsg;
                    } catch (jsonError) {
                        console.log(jsonError);
                        errorMsg = `Failed to parse assignments response. Server returned: ${response.statusText}.`;
                    }
                    throw new Error(errorMsg);
                }

                const data = await response.json();
                setAssignments(data);
                setDisplayedAssignments(data);

            } catch (err) {
                console.error("Failed to fetch assignments:", err);
                setError(`Failed to load assignments: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    useEffect(() => {
        let filtered = [...assignments];

        if (filterDifficulty !== 'all') {
            filtered = filtered.filter(assignment => assignment.difficulty === filterDifficulty);
        }

        if (searchTerm) {
            filtered = filtered.filter(assignment =>
                assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setDisplayedAssignments(filtered);
    }, [assignments, filterDifficulty, searchTerm]);

    const handleTakeAssignment = (assignmentId) => {
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

        navigate(`/take-assignment/${assignmentId}`);
    };

        const handleUpdate = (assignmentCreatorEmail, assignmentId) => {
        if (!user || user.email !== assignmentCreatorEmail) {
            Swal.fire({
                title: 'Permission Denied',
                text: user ? 'You can only update assignments you created.' : 'You need to log in to update an assignment.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (!user && result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        navigate(`/update-assignment/${assignmentId}`);
    };

    const handleDelete = (assignmentCreatorEmail, assignmentId) => {
        if (!user || user.email !== assignmentCreatorEmail) {
            Swal.fire({
                title: 'Permission Denied',
                text: user ? 'You can only delete assignments you created.' : 'You need to log in to delete an assignment.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (!user && result.isConfirmed) {
                    navigate('/login');
                }
            });
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

                    const response = await fetch(`https://a11-task-together-server.vercel.app/assignments/${assignmentId}?creatorEmail=${user.email}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                    }


                    setAssignments(prevAssignments => prevAssignments.filter(assign => assign._id !== assignmentId));
                    toast.success('Assignment deleted successfully!');
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


    const handleSearchClick = () => {
        setSearchTerm(tempSearchTerm);
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
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)] text-error font-semibold">
                {error}
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
                All Assignments
            </motion.h1>

            {/* Filter and Search Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
                {/* Difficulty Filter Dropdown */}
                <select
                    className="select select-bordered w-full md:w-auto"
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="input input-bordered w-full md:w-auto"
                    value={tempSearchTerm}
                    onChange={(e) => setTempSearchTerm(e.target.value)}
                />
                <button
                    onClick={handleSearchClick}
                    className="btn btn-primary w-full md:w-auto"
                >
                    Search
                </button>
            </div>

            {/* Assignments Grid/List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedAssignments.length > 0 ? (
                    displayedAssignments.map((assignment) => {
                        const isCreator = user && user.email === assignment.creatorEmail;

                        return (
                            <motion.div
                                key={assignment._id}
                                className="card bg-base-100 shadow-xl border border-base-300 dark:border-gray-700 transform transition-transform duration-300 hover:scale-[1.02]"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * displayedAssignments.indexOf(assignment) }}
                            >
                                <figure className="h-48 overflow-hidden">
                                    <img
                                        src={assignment.thumbnail}
                                        alt={assignment.title}
                                        className="w-full h-full object-cover"
                                    />
                                </figure>
                                <div className="card-body p-6">
                                    <h2 className="card-title text-2xl font-semibold text-primary mb-2">
                                        {assignment.title}
                                    </h2>
                                    <p className="text-base-content mb-1">
                                        <span className="font-medium">Marks:</span> {assignment.marks}
                                    </p>
                                    <p className="text-base-content mb-4">
                                        <span className="font-medium">Difficulty:</span>{' '}
                                        <span className={`badge ${
                                            assignment.difficulty === 'easy' ? 'badge-success' :
                                            assignment.difficulty === 'medium' ? 'badge-warning' :
                                            'badge-error'
                                        } text-white font-bold`}>
                                            {assignment.difficulty.charAt(0).toUpperCase() + assignment.difficulty.slice(1)}
                                        </span>
                                    </p>
                                    <div className="card-actions flex-nowrap justify-center gap-3 mt-4">
                                        <Link to={`/assignment/${assignment._id}`} className="btn btn-info btn-sm">
                                            View Assignment
                                        </Link>

                                        {isCreator ? (
                                            <>
                                                <button
                                                    onClick={() => handleUpdate(assignment.creatorEmail, assignment._id)}
                                                    className="btn btn-warning btn-sm"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(assignment.creatorEmail, assignment._id)}
                                                    className="btn btn-error btn-sm"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleTakeAssignment(assignment._id)}
                                                className="btn btn-primary btn-sm"
                                            >
                                                Take Assignment
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="text-center text-lg text-gray-500 mt-10 col-span-full">
                        No assignments match your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Assignments;