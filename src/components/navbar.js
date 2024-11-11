import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseconfig.js';
import { doc, getDoc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import '../Css/navbar.css';

const Navbar = ({ openSignupModal, openLoginModal }) => {
  const cart = useSelector((state) => state.cart);
  const items = cart?.items || [];
  const itemCount = items.length;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ fullName: 'User', photoURL: null });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserDetails(userDocSnap.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setIsLoggedIn(false);
        setUserDetails({ fullName: 'User', photoURL: null });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility state
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserDetails({ fullName: 'User', photoURL: null });
      setIsLoggedIn(false);
      navigate('/login');
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out!');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.profile-dropdown') &&
        !event.target.closest('.user-info') // Close dropdown if click is outside
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">MATH MARKET</Link>
        </div>
        <div className="navbar-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/listings">Listings</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">
              <span>Cart</span>
              {itemCount > 0 && <span>{itemCount}</span>}
            </Link></li>

            {isLoggedIn ? (
              <li className="user-info">
                <button
                  onClick={toggleDropdown} // Toggle the dropdown visibility
                  className="profile-button"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen ? 'true' : 'false'}
                >
                  {loading ? (
                    <div className="loading-placeholder"></div> // CSS Spinner for loading state
                  ) : (
                    <>
                      <img
                        src={userDetails.photoURL || 'default-avatar.png'}
                        alt="Profile"
                        className="profile-img"
                      />
                      <span>Hi, {userDetails.fullName}</span>
                    </>
                  )}
                </button>
                <div className={`profile-dropdown ${isDropdownOpen ? 'show' : ''}`}>
                  <ul>
                    <li><Link to="/profile">View Profile</Link></li>
                    <li><Link to="/my-listings">My Listings</Link></li>
                    <li><Link to="/create">Create Listing</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              </li>
            ) : (
              <li>
                <button onClick={openLoginModal} style={buttonStyle} aria-label="Login">Login</button>
                <button onClick={openSignupModal} style={buttonStyle} aria-label="Signup">Signup</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const buttonStyle = {
  color: '#fff',
  border: '1px solid #fff',
  padding: '8px 15px',
  cursor: 'pointer',
  background: 'transparent',
  borderRadius: '4px',
  marginRight: '10px',
};

export default Navbar;
