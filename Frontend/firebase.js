// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjN6inNH9mMvnTfKjohu2Z9dU3QoXPM6s",
  authDomain: "not-good-reads.firebaseapp.com",
  projectId: "not-good-reads",
  storageBucket: "not-good-reads.firebasestorage.app",
  messagingSenderId: "1005492563356",
  appId: "1:1005492563356:web:184dcd614280e4816f2c59",
  measurementId: "G-LSVVGEM9VZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);