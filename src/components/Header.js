import React, { useState, useEffect } from "react";
import { auth, database } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import "../index.css";

const Header = ({ search, setSearch }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const uid = currentUser.uid;
        const userRef = ref(database, `users/${uid}`);
        setUsernameLoading(true);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUsername(snapshot.val().username);
        } else {
          setUsername("");
        }
        setUsernameLoading(false);
      } else {
        setUsername("");
        setUsernameLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUsername("");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <>
      <div className="header-container">
        {/* Logo that links to HeroSectionPage */}
        <div className="logo">
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/TeamLead2-CM/OSINT_Directory_Resources/osint/logo/logo_T_OS_0006.jpg"
              alt="Logo"
              className="logo-image"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-buttons">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/home" className="nav-link">Tools</Link> {/* ✅ Points to HomePage */}
        </div>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          {user ? (
            <div className="auth-user-info">
              {usernameLoading ? (
                <span className="user-email">Welcome...</span>
              ) : (
                <span className="user-email">Welcome, {username}</span>
              )}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)}>Login</button>
              <button onClick={() => setShowSignup(true)}>Sign Up</button>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitch={switchToSignup}
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSwitch={switchToLogin}
        />
      )}
    </>
  );
};

export default Header;
