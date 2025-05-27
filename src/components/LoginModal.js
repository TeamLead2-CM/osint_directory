import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Ensure `auth` is exported from firebaseConfig
import "./ModalStyles.css";

function LoginModal({ onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose(); // Close the modal after successful login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Log In to Your Account</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}

        <button className="btn" onClick={handleLogin}>Log In</button>

        <p className="switch-link" onClick={onSwitch}>
          Don’t have an account? <span className="blue-text">Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
