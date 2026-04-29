// Firebase Configuration and Initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// REPLACE THESE VALUES with your actual Firebase config!
const firebaseConfig = {
  apiKey: "AIzaSyDrWtgf-cOpgvJAH05e8RNnskkygl5lGb4",
  authDomain: "dhathuru-8e1d8.firebaseapp.com",
  projectId: "dhathuru-8e1d8",
  storageBucket: "dhathuru-8e1d8.firebasestorage.app",
  messagingSenderId: "254161667514",
  appId: "1:254161667514:web:df34fa66c7d59428cc8983"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;