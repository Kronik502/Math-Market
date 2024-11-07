// src/components/listingList.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartActions.js"; // Import your addToCart action
import { fetchListingsStart, fetchListingsSuccess, fetchListingsFailure } from "../Redux/slices/listingslices.js";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig.js";
import { auth } from "../firebaseconfig.js";
import '../Css/listing.css';

const ListingList = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.listings);
  const loading = useSelector((state) => state.listings.loading);
  const error = useSelector((state) => state.listings.error);
  const [editMode, setEditMode] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", price: "", category: "" });

  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchListings = async () => {
      dispatch(fetchListingsStart());
      try {
        const querySnapshot = await getDocs(collection(db, "Listings"));
        const listingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(fetchListingsSuccess(listingsData));
      } catch (error) {
        dispatch(fetchListingsFailure(error.message));
      }
    };

    fetchListings();
  }, [dispatch]);

  const handleAddToCart = (listing) => {
    dispatch(addToCart(listing)); // Dispatch addToCart action
    alert(`${listing.title} added to the cart!`);
  };

  const handleDelete = async (listingId, userId) => {
    if (currentUser.uid !== userId) {
      alert("You are not authorized to delete this listing.");
      return;
    }
    try {
      await deleteDoc(doc(db, "Listings", listingId));
      dispatch(fetchListingsStart());
      alert("Listing deleted successfully.");
    } catch (error) {
      alert(`Error deleting listing: ${error.message}`);
    }
  };

  const handleEdit = (listing) => {
    setEditMode(listing.id);
    setEditForm({
      title: listing.title,
      description: listing.description,
      price: listing.price,
      category: listing.category,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, description, price, category } = editForm;

    if (!title || !description || !price || !category) {
      alert("All fields are required.");
      return;
    }

    try {
      await updateDoc(doc(db, "Listings", editMode), {
        title,
        description,
        price: parseFloat(price),
        category,
      });

      dispatch(fetchListingsStart());
      setEditMode(null);
      alert("Listing updated successfully.");
    } catch (error) {
      alert(`Error updating listing: ${error.message}`);
    }
  };

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!Array.isArray(listings) || listings.length === 0) {
    return <p>No listings available.</p>;
  }

  return (
    <div className="listing-container">
      <h2>Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id} className="listing-item">
            <h3>{listing.title}</h3>
            <p><strong>Description:</strong> {listing.description}</p>
            <p><strong>Price:</strong> ${listing.price.toFixed(2)}</p>
            <p><strong>Category:</strong> {listing.category}</p>
            {listing.sold && <p><strong>Status:</strong> Sold</p>}

            {listing.imageBase64 ? (
              <div>
                <h4>Image:</h4>
                <img 
                  src={listing.imageBase64} 
                  alt={listing.title} 
                  className="listing-image" 
                />
              </div>
            ) : (
              <p>No image available</p>
            )}

            {currentUser && currentUser.uid === listing.userId ? (
              <>
                <button onClick={() => handleEdit(listing)}>Edit</button>
                <button onClick={() => handleDelete(listing.id, listing.userId)}>Delete</button>
              </>
            ) : (
              <>
                {!listing.sold && (
                  <button onClick={() => handleAddToCart(listing)}>Add to Cart</button>
                )}
                {listing.sold && <p>This item has been sold.</p>}
              </>
            )}
          </li>
        ))}
      </ul>

      {editMode && (
        <div className="edit-form">
          <h3>Edit Listing</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Category</label>
              <input
                type="text"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                required
              />
            </div>
            <button type="submit">Update Listing</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListingList;
