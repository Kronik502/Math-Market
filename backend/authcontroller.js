import { auth } from './firebaseconfig.js'; // Correct named import for 'auth'

// Register new user
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user using Firebase Admin SDK
    const userRecord = await auth.createUser({
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully!",
      uid: userRecord.uid,
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({ error: "Failed to register user." });
  }
};

// Login user (not handled by Firebase Admin directly)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Placeholder for the actual login logic (client-side handles the login process)
    res.json({
      message: "User login logic should be handled on the client side.",
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to log in user." });
  }
};
