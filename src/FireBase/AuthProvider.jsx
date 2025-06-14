// import React, {  useEffect, useState } from 'react';
// import {
//     createUserWithEmailAndPassword,
//     GoogleAuthProvider,
//     onAuthStateChanged,
//     signInWithEmailAndPassword,
//     signInWithPopup,
//     signOut,
//     updateProfile 
// } from 'firebase/auth';
// import { auth } from './firebase.config';
// import { AuthContext } from './AuthContext';

// // need the bellow line for initiating google login system
// const googleprovider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//     const [loading, setLoading] = useState(true);
//     const [user, setUser] = useState(null);

//     // 1. Function for creating new user
//     const createUser = async (email, password, name, photoURL) => {
//         setLoading(true);
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             await updateProfile(userCredential.user, {
//                 displayName: name,
//                 photoURL: photoURL
//             });
//             // Update the user state in context to reflect the new profile data
//             // Firebase's onAuthStateChanged might take a moment, so manually update here
//             setUser({ ...userCredential.user, displayName: name, photoURL: photoURL });
//             return userCredential;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 2. Function for logging user
//     const loginUser = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password)
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     // 3. Function for login with Google
//     const googlelogin = () => {
//         setLoading(true);
//         return signInWithPopup(auth, googleprovider)
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     // 4. Function for log out
//     const logoutUser = () => {
//         setLoading(true);
//         return signOut(auth)
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     // 5. Function for setting user activeness: must needed function
//     useEffect(() => {
//         const unSubscribe = onAuthStateChanged(auth, currentUser => {
//             console.log('Current User (onAuthStateChanged):', currentUser); // Good for debugging
//             setUser(currentUser);
//             setLoading(false);
//         });
//         return () => {
//             unSubscribe();
//         };
//     }, []);

//     const authInfo = {
//         loading,
//         user,
//         createUser,
//         loginUser,
//         logoutUser,
//         googlelogin
//     };

//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

// new code // 
import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile as firebaseUpdateProfile, // ⭐ MODIFICATION: Renamed to avoid conflict ⭐
} from 'firebase/auth';
import { auth } from './firebase.config';
import { AuthContext } from './AuthContext'; // Ensure AuthContext is still defined/exported from AuthContext.js

// need the bellow line for initiating google login system
const googleprovider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // ⭐ NEW FUNCTION: To manually refresh the user object and update state ⭐
    const reloadAndSetUser = async () => {
        if (auth.currentUser) {
            try {
                await auth.currentUser.reload();
                // Get the reloaded user data and update the state
                setUser({ ...auth.currentUser }); // Create a new object reference to ensure state update
                console.log('User reloaded and state updated:', auth.currentUser);
            } catch (error) {
                console.error("Error reloading user in AuthProvider:", error);
            }
        }
    };


    // 1. Function for creating new user
    const createUser = async (email, password, name, photoURL) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await firebaseUpdateProfile(userCredential.user, { // ⭐ MODIFICATION: Use renamed updateProfile ⭐
                displayName: name,
                photoURL: photoURL
            });
            // ⭐ MODIFICATION: Instead of manual setUser, let onAuthStateChanged handle it or use reload ⭐
            // The onAuthStateChanged listener below will usually pick this up,
            // but for immediate consistency, we can force a reload.
            await userCredential.user.reload();
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
            .finally(() => {
                setLoading(false);
            });
    };

    // 3. Function for login with Google
    const googlelogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleprovider)
            .finally(() => {
                setLoading(false);
            });
    };

    // 4. Function for log out
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth)
            .finally(() => {
                setLoading(false);
            });
    };

    // 5. Function for setting user activeness: must needed function
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Current User (onAuthStateChanged):', currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        loading,
        user,
        createUser,
        loginUser,
        logoutUser,
        googlelogin,
        // ⭐ NEW: Expose the reloadAndSetUser function ⭐
        reloadAndSetUser,
        // You might also consider exposing the firebase auth object itself if you need more granular control,
        // but reloadAndSetUser is sufficient for this case.
        // authInstance: auth, // Optional: if other components need direct auth access
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;