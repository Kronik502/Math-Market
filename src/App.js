import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./context/usercontext.js"; // Ensure correct import path
import CreateListing from "./components/createlisting.js"; // Ensure correct import path
import Listings from "./components/listings.js"; // Ensure correct import path
import Home from "./components/home.js"; // Add Home component
import Login from "./components/login.js"; // Add Login component
import Signup from "./components/signup.js"; // Add Signup component
import Navbar from "./components/navbar.js"; // Import the Navbar

const App = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // Manage the signup modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Manage the login modal

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <UserProvider>
      <Router>
        {/* Place the Navbar outside of the routes so it's available on all pages */}
        <Navbar 
          openSignupModal={openSignupModal} 
          openLoginModal={openLoginModal} 
        />
        
        <main style={{ marginTop: "60px" }}> {/* Adjusting for the fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page route */}
            <Route path="/create" element={<CreateListing />} /> {/* Create Listing page */}
            <Route path="/listings" element={<Listings />} /> {/* Listings page */}
            <Route path="/login" element={<Login closeModal={closeLoginModal} />} /> {/* Login page */}
            <Route path="/signup" element={<Signup closeModal={closeSignupModal} />} /> {/* Signup page */}
          </Routes>
        </main>

        {/* Modals for Login and Signup */}
        {isSignupModalOpen && <Signup closeModal={closeSignupModal} />}
        {isLoginModalOpen && <Login closeModal={closeLoginModal} />}
      </Router>
    </UserProvider>
  );
};

export default App;
