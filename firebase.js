// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update, set, get} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyDuX4Xvml2rNe3MphJmGfVcDuk6QvTVHgs",
     authDomain: "task-manager-app--2025.firebaseapp.com",
     databaseURL: "https://task-manager-app--2025-default-rtdb.asia-southeast1.firebasedatabase.app",
     projectId: "task-manager-app--2025",
     storageBucket: "task-manager-app--2025.firebasestorage.app",
     messagingSenderId: "538032514378",
     appId: "1:538032514378:web:c709626838ea225a740db3",
     measurementId: "G-FCJ88VFQZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, push, onValue, remove, update, set, get };