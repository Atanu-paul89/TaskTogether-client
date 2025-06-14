import React, { useContext, useState } from 'react';
import { AuthContext } from '../FireBase/AuthContext'; 
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const CreateAssignments = () => {
    const { user } = useContext(AuthContext); // Get logged-in user from AuthContext
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setLoading(true);

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const marks = parseInt(form.marks.value); // Convert marks to integer
        const thumbnail = form.thumbnail.value;
        const difficulty = form.difficulty.value;
        const dueDate = form.dueDate.value; // Store as string for simplicity, or convert to Date object if needed

        // Get creator info from AuthContext
        const creatorEmail = user?.email;
        const creatorName = user?.displayName || 'Anonymous'; // Fallback to 'Anonymous'

        // Client-side Validation
        if (!title || !description || !marks || !thumbnail || !difficulty || !dueDate) {
            setFormError('All fields are required.');
            setLoading(false);
            return;
        }
        if (isNaN(marks) || marks <= 0) {
            setFormError('Marks must be a positive number.');
            setLoading(false);
            return;
        }
        try {
            new URL(thumbnail); // Basic URL validation
        } 
        catch (_) {
            setFormError('Invalid thumbnail URL.');
            setLoading(false);
            return;
        }
        if (!['easy', 'medium', 'hard'].includes(difficulty)) {
            setFormError('Invalid difficulty level selected.');
            setLoading(false);
            return;
        }
        // You might want more robust date validation (e.g., not in the past)
        const selectedDate = new Date(dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today to start of day
        if (selectedDate < today) {
            setFormError('Due date cannot be in the past.');
            setLoading(false);
            return;
        }

        const newAssignment = {
            title,
            description,
            marks,
            thumbnail,
            difficulty,
            dueDate,
            creatorEmail,
            creatorName,
            // You might want to add createdAt timestamp too
            createdAt: new Date().toISOString()
        };

        try {
            // ⭐ MODIFICATION HERE: Corrected backend URL ⭐
            const response = await fetch('http://localhost:5000/assignments', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include Authorization header if your backend requires it
                    // 'Authorization': `Bearer ${user?.accessToken}` // Example if using Firebase ID token
                },
                body: JSON.stringify(newAssignment),
            });

            if (!response.ok) {
                let errorMsg = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch (jsonError) {
                    // If response is not JSON (e.g., HTML 404 page), this catch will run
                    errorMsg = `Failed to parse error response. Server returned: ${response.statusText}. Likely a non-JSON response or truncated JSON.`;
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            console.log('Assignment created successfully:', data);
            toast.success('Assignment created successfully!');
            form.reset(); // Clear the form
            navigate('/assignments'); // Redirect to the assignments page
        } catch (err) {
            console.error('Error creating assignment:', err);
            toast.error(`Failed to create assignment: ${err.message}`);
            setFormError(`Failed to create assignment: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container px-2 mx-auto p-4 min-h-[calc(100vh-200px)] flex items-center justify-center">
            <motion.div
                className="card w-full max-w-2xl bg-base-100 shadow-xl border border-base-300 p-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-center text-primary mb-8">Create New Assignment</h2>

                {formError && (
                    <div role="alert" className="alert alert-error mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{formError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="label"><span className="label-text text-base-content">Title</span></label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g., React Component Design"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label"><span className="label-text text-base-content">Description</span></label>
                        <textarea
                            name="description"
                            placeholder="Provide a detailed description of the assignment..."
                            className="textarea textarea-bordered w-full h-24"
                            required
                        ></textarea>
                    </div>

                    {/* Marks & Difficulty */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label"><span className="label-text text-base-content">Marks</span></label>
                            <input
                                type="number"
                                name="marks"
                                placeholder="e.g., 100"
                                className="input input-bordered w-full"
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="label"><span className="label-text text-base-content">Difficulty Level</span></label>
                            <select
                                name="difficulty"
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Select Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Thumbnail URL */}
                    <div>
                        <label className="label"><span className="label-text text-base-content">Thumbnail Image URL</span></label>
                        <input
                            type="url"
                            name="thumbnail"
                            placeholder="e.g., https://example.com/image.jpg"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="label"><span className="label-text text-base-content">Due Date</span></label>
                        <input
                            type="date"
                            name="dueDate"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                'Create Assignment'
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateAssignments;