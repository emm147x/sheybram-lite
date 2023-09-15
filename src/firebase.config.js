
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCOro8XmX8FpmdJjt_cKPbHEtdLc139Mds",
  authDomain: "sheygram-lite-udemy-e3b8f.firebaseapp.com",
  projectId: "sheygram-lite-udemy-e3b8f",
  storageBucket: "sheygram-lite-udemy-e3b8f.appspot.com",
  messagingSenderId: "335362549520",
  appId: "1:335362549520:web:777b032e30cd758c17a795",
  measurementId: "G-4C18FMBL02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app)

export { app, fireDb}