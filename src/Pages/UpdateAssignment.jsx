import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { AuthContext } from '../FireBase/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
console.log(motion);
const UpdateAssignment = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { user, loading: authLoading } = useContext(AuthContext);

    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [marks, setMarks] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [dueDate, setDueDate] = useState(''); 

    useEffect(() => {
        const fetchAssignmentData = async () => {
            if (!user && !authLoading) {

                Swal.fire({
                    title: 'Not Logged In',
                    text: 'You must be logged in to update assignments.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Login',
                    cancelButtonText: 'Cancel',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    } else {
                        navigate('/assignments');
                    }
                });
                return;
            }

            if (!id || authLoading) return; 

            setLoading(true);
            setError(null);
            try {

                const response = await fetch(`https://tasktogether-server.vercel.app/assignments/${id}`);


                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                const data = await response.json();


                if (user && user.email !== data.creatorEmail) {
                    Swal.fire({
                        title: 'Permission Denied',
                        text: 'You can only edit assignments you created.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/assignments'); 
                    });
                    return; 
                }

                setAssignment(data);
                setTitle(data.title);
                setDescription(data.description);
                setMarks(data.marks);
                setThumbnail(data.thumbnail);
                setDifficulty(data.difficulty);
                setDueDate(new Date(data.dueDate).toISOString().split('T')[0]);

            } catch (err) {
                console.error('Error fetching assignment for update:', err);
                setError(`Failed to load assignment for editing: ${err.message}`);
                toast.error(`Error: ${err.message}`);
                navigate('/assignments'); 
            } finally {
                setLoading(false);
            }
        };

        fetchAssignmentData();
    }, [id, user, authLoading, navigate]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('You must be logged in to update an assignment.');
            return;
        }

        const updatedAssignmentData = {
            title,
            description,
            marks: Number(marks), 
            thumbnail,
            difficulty,
            dueDate: new Date(dueDate), 
            creatorEmail: user.email, 
            creatorName: user.displayName || 'Unknown', 
        };

        setLoading(true); 
        try {

            const response = await fetch(`https://tasktogether-server.vercel.app/assignments/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAssignmentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Assignment updated successfully:', result);
            toast.success('Assignment updated successfully!');
            navigate(`/assignment/${id}`); 

        } catch (err) {
            console.error('Failed to update assignment:', err);
            setError(`Failed to update assignment: ${err.message}`);
            toast.error(`Failed to update assignment: ${err.message}`);
        } finally {
            setLoading(false);
        }
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
                Assignment data not found.
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 py-8">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center text-primary mb-8"
            >
                Update Assignment
            </motion.h1>

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-base-100 shadow-xl rounded-lg p-8 max-w-2xl mx-auto border border-base-300 dark:border-gray-700"
            >
                {/* Title */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Assignment Title"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Description */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24 w-full"
                        placeholder="Detailed Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                {/* Marks and Difficulty Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Marks</span>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 100"
                            className="input input-bordered w-full"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            required
                            min="1"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Difficulty Level</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            required
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>

                {/* Thumbnail Image URL */}
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Thumbnail Image URL</span>
                    </label>
                    <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="input input-bordered w-full"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        required
                    />
                </div>

                {/* Due Date */}
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Due Date</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : 'Update Assignment'}
                    </button>
                </div>
                <div className="text-center mt-4">
                    <button type="button" onClick={() => navigate(-1)} className="btn btn-outline btn-sm">
                        Cancel
                    </button>
                </div>
            </motion.form>
        </div>
    );
};

export default UpdateAssignment;

