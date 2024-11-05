import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebaseconfig.js"; // Adjust the path if needed
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fetchListingsStart, fetchListingsSuccess } from "../Redux/slices/listingslices.js";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);  // Handle image file state
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
    if (!title || !description || !price || !imageFile) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price.");
      setLoading(false);
      return;
    }

    // Create a storage reference and upload the file
    const imageRef = ref(storage, `images/${imageFile.name}`);
    try {
      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);  // Get the image URL

      // Now add the listing to Firestore
      const newListing = {
        title,
        description,
        price: parseFloat(price),
        imageUrl: downloadURL,  // Use the uploaded image URL
      };

      // Add to Firestore
      await addDoc(collection(db, "Listings"), newListing);

      // Dispatch action to update the Redux store
      dispatch(fetchListingsStart());
      dispatch(fetchListingsSuccess([newListing]));  // Assuming you're adding the listing directly

      setLoading(false);
      setTitle("");
      setDescription("");
      setPrice("");
      setImageFile(null);  // Clear the image file
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
