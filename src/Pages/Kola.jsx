// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../FireBase/AuthContext';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router'; // ⭐ MODIFIED: Ensure Link is from 'react-router-dom' ⭐
// console.log(motion);
// const MySubmission = () => {
//     const { user } = useContext(AuthContext);
//     const [mySubmittedAssignments, setMySubmittedAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!user?.email) {
//             setLoading(false);
//             return;
//         }

//         const fetchMySubmissions = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 // Your corrected fetch URL
//                 const response = await fetch(`http://localhost:5000/submitted-assignments/my-submitted-assignments?email=${user.email}`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 });

//                 if (!response.ok) {
//                     let errorMsg = `HTTP error! status: ${response.status}`;
//                     try {
//                         const errorData = await response.json();
//                         errorMsg = errorData.message || errorMsg;
//                     } catch (jsonError) {
//                         console.log(jsonError);
//                         errorMsg = `Failed to parse error response. Server returned: ${response.statusText}. Likely a non-JSON response (e.g., HTML error page).`;
//                     }
//                     throw new Error(errorMsg);
//                 }

//                 const data = await response.json();
//                 setMySubmittedAssignments(data);
//             } catch (err) {
//                 console.error('Error fetching my submissions:', err);
//                 setError(`Failed to load your submissions: ${err.message}`);
//                 toast.error(`Error loading submissions: ${err.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMySubmissions();
//     }, [user?.email]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
//                 <span className="loading loading-spinner loading-lg text-primary"></span>
//             </div>
//         );
//     }

//     if (!user) {
//         return (
//             <div className="flex justify-center items-center min-h-[calc(100vh-200px)] text-warning font-semibold">
//                 Please log in to view your submitted assignments.
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-[calc(100vh-200px)] text-error font-semibold">
//                 {error}
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <motion.h1
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-4xl font-bold text-center text-primary mb-8"
//             >
//                 My Submitted Assignments
//             </motion.h1>

//             {mySubmittedAssignments.length === 0 ? (
//                 <div className="text-center text-lg text-gray-500 mt-10 min-h-[calc(100vh-350px)] flex flex-col justify-center items-center">
//                     <p>You haven't submitted any assignments yet.</p>
//                     <p className="mt-2">Go to the <Link to="/assignments" className="text-info hover:underline">Assignments page</Link> to take one!</p>
//                 </div>
//             ) : (
//                 <>
//                     {/* Table for larger devices (sm and up) */}
//                     <div className="overflow-x-auto rounded-lg shadow-xl border border-base-300 dark:border-gray-700 hidden sm:block"> {/* ⭐ MODIFIED ⭐ */}
//                         <table className="table w-full text-base-content">
//                             <thead>
//                                 <tr className="bg-base-200 text-lg">
//                                     <th>Assignment Title</th>
//                                     <th>Original Marks</th>
//                                     <th>Obtained Marks</th>
//                                     <th>Status</th>
//                                     <th>Feedback</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {mySubmittedAssignments.map((submission) => (
//                                     <motion.tr
//                                         key={submission._id}
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ duration: 0.4, delay: 0.1 * mySubmittedAssignments.indexOf(submission) }}
//                                         className="hover:bg-base-300"
//                                     >
//                                         <td className="font-semibold">{submission.assignmentTitle}</td>
//                                         <td>{submission.originalMarks}</td>
//                                         <td>{submission.obtainedMarks || 'N/A'}</td>
//                                         <td>
//                                             <span className={`badge ${
//                                                 submission.status === 'pending' ? 'badge-warning' : 'badge-success'
//                                             } text-white font-bold`}>
//                                                 {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
//                                             </span>
//                                         </td>
//                                         <td>{submission.feedback || 'No feedback yet.'}</td>
//                                     </motion.tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Card-like display for smaller devices (below sm) */}
//                     <div className="sm:hidden grid grid-cols-1 gap-4"> {/* ⭐ NEW BLOCK ⭐ */}
//                         {mySubmittedAssignments.map((submission) => (
//                             <motion.div
//                                 key={submission._id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.4, delay: 0.1 * mySubmittedAssignments.indexOf(submission) }}
//                                 className="card bg-base-100 shadow-xl border border-base-300 dark:border-gray-700 p-4"
//                             >
//                                 <div className="mb-2">
//                                     <span className="font-semibold text-primary">Assignment Title:</span> {submission.assignmentTitle}
//                                 </div>
//                                 <div className="mb-2">
//                                     <span className="font-semibold">Original Marks:</span> {submission.originalMarks}
//                                 </div>
//                                 <div className="mb-2">
//                                     <span className="font-semibold">Obtained Marks:</span> {submission.obtainedMarks || 'N/A'}
//                                 </div>
//                                 <div className="mb-2">
//                                     <span className="font-semibold">Status:</span>{' '}
//                                     <span className={`badge ${
//                                         submission.status === 'pending' ? 'badge-warning' : 'badge-success'
//                                     } text-white font-bold`}>
//                                         {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
//                                     </span>
//                                 </div>
//                                 <div>
//                                     <span className="font-semibold">Feedback:</span> {submission.feedback || 'No feedback yet.'}
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default MySubmission;