// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUJRlIGoxgYq8dldlm3jBsrNAARPvYkEs",
  authDomain: "focii-49d70.firebaseapp.com",
  projectId: "focii-49d70",
  storageBucket: "focii-49d70.appspot.com",
  messagingSenderId: "524060237648",
  appId: "1:524060237648:web:b8bc25191615a3fec55655",
  measurementId: "G-31PHPM1ZKL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const gprovider = new GoogleAuthProvider();
