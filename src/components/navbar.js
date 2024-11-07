import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseconfig.js'; // Ensure this is correct
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import '../Css/navbar.css';

const Navbar = ({ openSignupModal, openLoginModal }) => {
  const cart = useSelector((state) => state.cart);
  const items = cart?.items || [];
  const itemCount = items.length;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ fullName: 'User', photoURL: null });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data from Firestore when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserDetails(userDocSnap.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false); // After loading, stop showing the loading state
    };

    fetchUserData();
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserDetails({ fullName: 'User', photoURL: null });
      navigate('/login');
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out!');
    }
  };

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
            <li>
              <Link to="/cart">
                <span>Cart</span>
                {itemCount > 0 && <span>{itemCount}</span>}
              </Link>
            </li>

            {/* Conditionally render the Profile/Logout or Login/Signup buttons */}
            {auth.currentUser ? (
              // If the user is logged in, show their profile picture and dropdown
              <li>
                <span onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                  {loading ? (
                    <div className="loading-placeholder">Loading...</div>
                  ) : (
                    <>
                      <img 
                        src={userDetails.photoURL || 'default-avatar.png'} 
                        alt="Profile" 
                        style={{ width: 30, height: 30, borderRadius: '50%' }}
                      />
                      <span>Hi, {userDetails.fullName}</span>
                    </>
                  )}
                </span>
                {isDropdownOpen && (
                  <div className="profile-dropdown">
                    <ul>
                      <li><Link to="/profile">View Profile</Link></li>
                      <li><Link to="/my-listings">My Listings</Link></li>
                      <li><Link to="/create">Create Listing</Link></li>
                      <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              // If the user is logged out, show Login and Signup buttons
              <li>
                <button 
                  onClick={openLoginModal} 
                  style={{
                    color: '#fff',
                    border: '1px solid #fff',
                    padding: '8px 15px',
                    cursor: 'pointer',
                    background: 'transparent',
                    borderRadius: '4px',
                    marginRight: '10px',
                  }}
                >
                  Login
                </button>
                <button 
                  onClick={openSignupModal} 
                  style={{
                    color: '#fff',
                    border: '1px solid #fff',
                    padding: '8px 15px',
                    cursor: 'pointer',
                    background: 'transparent',
                    borderRadius: '4px',
                  }}
                >
                  Signup
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
