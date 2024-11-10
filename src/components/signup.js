import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig.js";

const Signup = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check if 'Remember Me' was previously selected and retrieve saved credentials
    if (localStorage.getItem("rememberMe") === "true") {
      setRememberMe(true);
      setEmail(localStorage.getItem("email"));
      setPassword(localStorage.getItem("password"));
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple validation for password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", true);
      }
      closeModal();
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Email already in use.");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        animation: "fadeIn 0.3s ease-out",
      }}
      onClick={closeModal} // Close modal on click outside the modal
    >
      <div
        className="modal"
        style={{
          background: "linear-gradient(135deg, #6b7c93, #4b5b72)",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "450px",
          padding: "35px 30px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          opacity: 1,
          transition: "all 0.3s ease-out",
          animation: "fadeIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()} // Stop click propagation inside the modal
      >
        <h2
          style={{
            fontSize: "26px",
            color: "#fff",
            marginBottom: "25px",
            fontFamily: '"Roboto", sans-serif',
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Create Account
        </h2>
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column" }}>
          <div className="input-container" style={{ marginBottom: "20px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "14px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "16px",
                color: "#333",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onFocus={(e) => e.target.style.borderColor = "#4e9ff1"}
              onBlur={(e) => e.target.style.borderColor = "#ccc"}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "14px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "16px",
                color: "#333",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onFocus={(e) => e.target.style.borderColor = "#4e9ff1"}
              onBlur={(e) => e.target.style.borderColor = "#ccc"}
            />
          </div>

          <div
            className="remember-me-container"
            style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <label
              className="remember-me-label"
              style={{
                fontSize: "15px",
                fontFamily: '"Roboto", sans-serif',
                marginLeft: "10px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                style={{
                  marginRight: "8px",
                  transform: "scale(1.2)",
                  cursor: "pointer",
                }}
              />
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "15px",
              backgroundColor: "#4e9ff1",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "500",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#3684d7"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#4e9ff1"}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          {error && (
            <p
              className="error-message"
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "15px",
                fontFamily: '"Roboto", sans-serif',
                fontWeight: "400",
              }}
            >
              {error}
            </p>
          )}
        </form>

        <div className="modal-footer" style={{ marginTop: "25px" }}>
          <button
            className="close-btn"
            onClick={closeModal}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "22px",
              cursor: "pointer",
              padding: "5px",
            }}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
