// server.js (with ES module imports)
import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
import serviceAccount from "./firebase-adminsdk.json" assert { type: "json" };
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic routes
app.get("/", (req, res) => {
  res.send("Welcome to the Math Market API!");
});

// Import routes
import authRoutes from "./auth.js";
import productRoutes from "./products.js";

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
