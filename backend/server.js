import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import dotenv from "dotenv";
import stripePackage from "stripe"; // Import Stripe package

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
import serviceAccount from "./firebase-adminsdk.json" assert { type: "json" };
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Stripe
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Math Market API!");
});

// Import routes
import authRoutes from "./auth.js";
import productRoutes from "./products.js";

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Stripe payment route
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents (e.g., 5000 for $50.00)
      currency: "usd", // or your preferred currency
      payment_method_types: ["card"],
    });

    // Send the client secret for client-side payment confirmation
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
