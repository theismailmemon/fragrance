// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCVNdfGM2dM1T7zprEC5veOKnmS9e0blGw",
  authDomain: "emailpasswordlogin-ae7b0.firebaseapp.com",
  projectId: "emailpasswordlogin-ae7b0",
  storageBucket: "emailpasswordlogin-ae7b0.appspot.com",
  messagingSenderId: "510163209098",
  appId: "1:510163209098:web:970e5d92bf9aa3b69fd673"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth object and provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
