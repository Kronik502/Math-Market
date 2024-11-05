// controllers/productController.js
const admin = require("firebase-admin");

// Fetch all products
exports.getProducts = async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection("products").get();
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const newProduct = await admin.firestore().collection("products").add({
      name,
      price,
      description,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ message: "Product created successfully!", id: newProduct.id });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product." });
  }
};
