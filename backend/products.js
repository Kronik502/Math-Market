// routes/products.js
import express from 'express';

const router = express.Router();

// Define product management routes (example)
router.get('/', (req, res) => {
  res.json({ message: 'List of products' });
});

export default router;
