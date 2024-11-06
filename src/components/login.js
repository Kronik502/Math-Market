import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig.js';
import '../Css/login.css'

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
            // Sign in the user with Firebase Auth
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful!');
            closeModal();  // Close the modal after successful login
        } catch (err) {
            setError(`Error logging in: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Login</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <label>Email Address:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default Login;
