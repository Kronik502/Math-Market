import React, { useState } from 'react';
import { auth } from '../firebaseconfig.js'; // Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase signIn method

const Login = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Firebase login logic
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      closeModal(); // Close modal after successful login
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
      onClick={closeModal} // Close modal when clicking outside of the modal
    >
      <div 
        className="modal" 
        style={{
          background: 'linear-gradient(135deg, #6b7c93, #4b5b72)',
          borderRadius: '10px',
          width: '400px',
          padding: '30px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          opacity: 1,
          transition: 'all 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()} // Stop click event from propagating to the overlay
      >
        <h2 
          style={{
            fontSize: '24px',
            color: '#fff',
            marginBottom: '20px',
            fontFamily: '"Roboto", sans-serif',
            fontWeight: '500'
          }}
        >
          Login
        </h2>
        {error && (
          <p 
            style={{
              color: 'red', 
              fontSize: '14px', 
              marginBottom: '20px', 
              fontFamily: '"Roboto", sans-serif',
              fontWeight: '400'
            }}
          >
            {error}
          </p>
        )}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
          <label 
            style={{
             
              fontSize: '14px', 
              textAlign: 'left', 
              marginBottom: '5px',
              fontFamily: '"Roboto", sans-serif'
            }}
          >
            Email Address:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = '#4e9ff1'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <label 
            style={{
       
              fontSize: '14px', 
              textAlign: 'left', 
              marginBottom: '5px',
              fontFamily: '"Roboto", sans-serif'
            }}
          >
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = '#4e9ff1'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '15px',
              backgroundColor: '#4e9ff1',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '500',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#3684d7'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4e9ff1'}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Login;
