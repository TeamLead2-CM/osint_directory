// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth"; // ✅ Import Auth

const firebaseConfig = {
  apiKey: "AIzaSyB06_kfQDAOu4VN1Oyoa1_D5KhnO10NwAY",
  authDomain: "osint-tools-8026c.firebaseapp.com",
  databaseURL: "https://osint-tools-8026c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "osint-tools-8026c",
  storageBucket: "osint-tools-8026c.firebasestorage.app",
  messagingSenderId: "989470710199",
  appId: "1:989470710199:web:c3992c6d9a798edac8b032"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // ✅ Initialize Auth

export { database, ref, get, auth }; // ✅ Export auth too
