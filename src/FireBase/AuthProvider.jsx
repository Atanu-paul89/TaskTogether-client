
import React, { useEffect, useState, createContext } from 'react';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile as firebaseUpdateProfile,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './firebase.config';
import { AuthContext } from './AuthContext';

const googleprovider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [backendToken, setBackendToken] = useState(localStorage.getItem('access-token'));


    const reloadAndSetUser = async () => {
        if (auth.currentUser) {
            try {
                await auth.currentUser.reload();

                setUser({ ...auth.currentUser }); 
                console.log('User reloaded and state updated:', auth.currentUser);
            } catch (error) {
                console.error("Error reloading user in AuthProvider:", error);
            }
        }
    };


    const getAndStoreBackendToken = async (currentUser) => {
        if (currentUser) {
            try {
                const res = await fetch('https://a11-task-together-server.vercel.app/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: currentUser.email,
                        firebaseUid: currentUser.uid
                    }),
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.token) {
                        localStorage.setItem('access-token', data.token);
                        setBackendToken(data.token);
                        console.log("Backend JWT received and stored.");
                    } else {
                        console.error('Backend did not return a token:', data.message);
                        localStorage.removeItem('access-token');
                        setBackendToken(null);
                    }
                } else {
                    const errorData = await res.json();
                    console.error('Failed to get backend token (HTTP error):', errorData.message);
                    localStorage.removeItem('access-token');
                    setBackendToken(null);
                }
            } catch (err) {
                console.error('Error fetching backend token:', err);
                localStorage.removeItem('access-token');
                setBackendToken(null);
            }
        } else {
            localStorage.removeItem('access-token');
            setBackendToken(null);
        }
    };


    // 1. Function for creating new user
    const createUser = async (email, password, name, photoURL) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await firebaseUpdateProfile(userCredential.user, {
                displayName: name,
                photoURL: photoURL
            });
            await getAndStoreBackendToken(userCredential.user);
            setUser({ ...userCredential.user, displayName: name, photoURL: photoURL });
            return userCredential;
        } finally {
            setLoading(false);
        }
    };

    // 2. Function for logging user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                await getAndStoreBackendToken(userCredential.user);
                return userCredential;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 3. Function for login with Google
    const googlelogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleprovider)
            .then(async (userCredential) => {
                await getAndStoreBackendToken(userCredential.user);
                return userCredential;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 4. Function for log out
    const logoutUser = () => {
        setLoading(true);
        localStorage.removeItem('access-token');
        setBackendToken(null);
        return signOut(auth)
            .finally(() => {
                setLoading(false);
            });
    };

    // 5. Function for setting user activeness: must needed function
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log('Current User (onAuthStateChanged):', currentUser);
            setUser(currentUser);

            await getAndStoreBackendToken(currentUser);

            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    //6. function for reseting password //
    const resetPassword = (email) => {
        setLoading(true); 
        return sendPasswordResetEmail(auth, email)
            .finally(() => { 
                setLoading(false);
            });
    };

    const authInfo = {
        loading,
        user,
        backendToken,
        createUser,
        resetPassword,
        loginUser,
        logoutUser,
        googlelogin,
        reloadAndSetUser, 
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;