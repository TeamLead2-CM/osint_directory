import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSectionPage from "./pages/HeroSectionPage";
import HomePage from "./pages/HomePage";
import ToolDetails from "./pages/ToolDetails";
import ImageTest from "./ImageTest";
import { UserProvider } from "./UserContext"; // ✅ Import UserProvider
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider> {/* ✅ Wrap everything inside UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HeroSectionPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/tool/:id" element={<ToolDetails />} />
          <Route path="/test-image" element={<ImageTest />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
