import React, { useState } from 'react';
import '../Css/signup.css'

const Signup = ({ closeModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Add Firebase signup logic here
            // On success:
            alert('Signup successful!');
            closeModal(); // Close the modal after successful signup
        } catch (err) {
            setError('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Signup</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSignup}>
                   
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
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </form>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default Signup;
