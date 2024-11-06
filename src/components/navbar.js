import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseconfig.js'; // Import your Firebase auth
import '../Css/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Track user state

  // Handle user state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Listen for user state changes
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null); // Update user state after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">MATH MARKET</Link>
        </div>

        {/* Burger Icon for mobile */}
        <div className="burger-menu" onClick={toggleMenu}>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
        </div>

        {/* Navbar Links */}
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/listings">Listings</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {/* Conditionally render based on user authentication */}
            {user ? (
              <li className="user-info">
                <div className="user-profile">
                  <span>Hi, {user.displayName || 'User'}</span>
                  <div className="profile-dropdown">
                    <ul>
                      <li><Link to="/profile">View Profile</Link></li>
                      <li><Link to="/cart">View Cart</Link></li>
                      <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </div>
                </div>
              </li>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
