// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2H_iSzW6D-snC4sYlA5bNZfSFBcqasAU",
  authDomain: "a11-tasktogether.firebaseapp.com",
  projectId: "a11-tasktogether",
  storageBucket: "a11-tasktogether.firebasestorage.app",
  messagingSenderId: "478957606887",
  appId: "1:478957606887:web:185bd67808b3280ee48f42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);