// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; //es la conexión hacia la autenticación

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL3tUE-LN9K638GZ00BJY8peSji5h47E8",
  authDomain: "bookbuster-68bb6.firebaseapp.com",
  projectId: "bookbuster-68bb6",
  storageBucket: "bookbuster-68bb6.appspot.com",
  messagingSenderId: "305665143388",
  appId: "1:305665143388:web:375adcc8bb6178617bec99",
  measurementId: "G-691HT3PFVP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app); //es la que me permite autenticar usuarios