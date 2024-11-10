import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./context/usercontext.js";
import CreateListing from "./components/createlisting.js";
import Listings from "./components/listings.js";
import Home from "./components/home.js";
import ProfilePage from "./components/profile.js";  // Import ProfilePage component
import LoginModal from "./components/login.js"; 
import SignupModal from "./components/signup.js"; 
import Navbar from "./components/navbar.js"; 
import "./App.css"; // Import the CSS file for styles

const App = () => {
  const [modalContent, setModalContent] = useState(null); // Manage modal content (Login/Signup)

  // Open login modal
  const openLoginModal = () => setModalContent("login");

  // Open signup modal
  const openSignupModal = () => setModalContent("signup");

  // Close modal
  const closeModal = () => setModalContent(null);

  return (
    <UserProvider>
      <Router>
        {/* Navbar is available on all pages */}
        <Navbar 
          openSignupModal={openSignupModal} 
          openLoginModal={openLoginModal} 
        />

        <main style={{ marginTop: "60px" }}> {/* Offset for the fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />  {/* Home page */}
            <Route path="/create" element={<CreateListing />} />  {/* Create Listing page */}
            <Route path="/listings" element={<Listings />} />  {/* Listings page */}
            <Route path="/profile" element={<ProfilePage />} />  {/* Profile page */}
          </Routes>
        </main>

        {/* Modals rendered conditionally */}
        {modalContent && (
          <div 
            className="modal-overlay" 
            onClick={closeModal}
            aria-modal="true"
          >
            <div 
              className="modal-content" 
              onClick={(e) => e.stopPropagation()} // Prevent closing modal on content click
            >
              {modalContent === "login" && <LoginModal closeModal={closeModal} />}
              {modalContent === "signup" && <SignupModal closeModal={closeModal} />}
            </div>
          </div>
        )}
      </Router>
    </UserProvider>
  );
};

export default App;
