import React, { use } from 'react';
import { AuthContext } from '../FireBase/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-59">
                <span className="loading loading-dots loading-xl text-5xl text-white"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;