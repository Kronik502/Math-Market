// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./context/usercontext.js";
import CreateListing from "./components/createlisting.js";
import Listings from "./components/listings.js";
import Home from "./components/home.js";
import ProfilePage from "./components/profile.js"; 
import LoginModal from "./components/login.js"; 
import SignupModal from "./components/signup.js"; 
import Navbar from "./components/navbar.js"; 
import Cart from "./components/cart.js";
import PaymentPage from "./components/stripewrapper.js";
import PaymentSuccess from "./components/paymentsuccess.js"; 
import { useDispatch, useSelector } from "react-redux"; 
import { clearCart } from "./Redux/slices/cartSlice.js"; 

const App = () => {
  const [modalContent, setModalContent] = useState(null); // Manage modal content (Login/Signup)

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []); // Default to an empty array if items are undefined

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Open login modal
  const openLoginModal = () => setModalContent("login");

  // Open signup modal
  const openSignupModal = () => setModalContent("signup");

  // Close modal
  const closeModal = () => setModalContent(null);

  // Handle successful login (set the logged-in state to true)
  const handleLoginSuccess = () => {
    closeModal();
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(clearCart()); // Clear the cart after logout
  };

  return (
    <UserProvider>
      <Router>
        <Navbar 
          openSignupModal={openSignupModal} 
          openLoginModal={openLoginModal} 
        />

        <main style={{ marginTop: "60px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateListing />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Routes>
        </main>

        {/* Modals rendered conditionally */}
        {modalContent && (
          <div 
            className="modal-overlay" 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              animation: 'fadeIn 0.3s ease-out'
            }}
            onClick={closeModal}
          >
            {modalContent === "login" && <LoginModal closeModal={closeModal} onLoginSuccess={handleLoginSuccess} />}
            {modalContent === "signup" && <SignupModal closeModal={closeModal} />}
          </div>
        )}
      </Router>
    </UserProvider>
  );
};

export default App;
