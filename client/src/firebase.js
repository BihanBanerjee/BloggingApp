// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bloggingapp-9eff2.firebaseapp.com",
  projectId: "bloggingapp-9eff2",
  storageBucket: "bloggingapp-9eff2.firebasestorage.app",
  messagingSenderId: "911175853281",
  appId: "1:911175853281:web:cc0f20fb426c438b0203a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);