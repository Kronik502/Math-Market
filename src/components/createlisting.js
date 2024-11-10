import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseconfig.js"; // Adjust the path if needed
import { fetchListingsStart, fetchListingsSuccess } from "../Redux/slices/listingslices.js";

// Define categories array (30 predefined categories)
const categories = [
  "Electronics",
  "Furniture",
  "Fashion",
  "Toys & Games",
  "Sports & Outdoors",
  "Books",
  "Beauty & Health",
  "Automotive",
  "Jewelry & Watches",
  "Art & Collectibles",
  "Home Appliances",
  "Food & Beverage",
  "Pet Supplies",
  "Tools & Home Improvement",
  "Groceries",
  "Music & Instruments",
  "Movies, Music & Games",
  "Video Games & Consoles",
  "Laptops & Computers",
  "Mobile Phones & Accessories",
  "Camera & Photography",
  "Outdoor Gear & Equipment",
  "Bicycles & Accessories",
  "Gaming Consoles & Accessories",
  "Smart Home Devices",
  "Baby & Kids",
  "Garden & Outdoor",
  "Health & Personal Care",
  "Musical Instruments & Gear",
  "Hobbies & Crafts"
];

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); // New category state
  const [imageFile, setImageFile] = useState(null); // Handle image file state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  // Handle image file change (image upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate fields
    if (!title || !description || !price || !category || !imageFile) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price.");
      setLoading(false);
      return;
    }

    // Convert image to Base64
    const convertImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      // Convert image to Base64 string
      const base64Image = await convertImageToBase64(imageFile);

      // Prepare the new listing object with Base64 image
      const newListing = {
        title,
        description,
        price: parseFloat(price),
        category,
        imageBase64: base64Image, // Store the Base64 image string here
      };

      // Add the listing to Firestore
      await addDoc(collection(db, "Listings"), newListing);

      // Dispatch action to update the Redux store
      dispatch(fetchListingsStart());
      dispatch(fetchListingsSuccess([newListing]));

      // Reset the form and state
      setLoading(false);
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImageFile(null);
      alert("Listing created successfully!");
    } catch (err) {
      setLoading(false);
      setError(`Error creating listing: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Create New Listing</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
