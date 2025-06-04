// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth"; // ✅ Import Auth

const firebaseConfig = {
  apiKey: "AIzaSyBeObs2vJJ7UlPUpIjh0tXnktkq9Elqb9c",
  authDomain: "osint-directory-55604.firebaseapp.com",
  databaseURL: "https://osint-directory-55604-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "osint-directory-55604",
  storageBucket: "osint-directory-55604.firebasestorage.app",
  messagingSenderId: "270099368336",
  appId: "1:270099368336:web:549f5dea776891c0270b15"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // ✅ Initialize Auth

export { database, ref, get, auth }; // ✅ Export auth too
