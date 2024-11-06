import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingsStart, fetchListingsSuccess, fetchListingsFailure } from "../Redux/slices/listingslices.js";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig.js"; // Ensure correct import path
import { auth } from "../firebaseconfig.js"; // Import auth to get current user
import '../Css/listing.css'

const ListingList = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.listings);
  const loading = useSelector((state) => state.listings.loading);
  const error = useSelector((state) => state.listings.error);
  const [editMode, setEditMode] = useState(null); // Store the id of the listing to edit
  const [editForm, setEditForm] = useState({ title: "", description: "", price: "", category: "" });

  const currentUser = auth.currentUser; // Get the currently logged-in user

  useEffect(() => {
    const fetchListings = async () => {
      dispatch(fetchListingsStart());

      try {
        const querySnapshot = await getDocs(collection(db, "Listings"));
        const listingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(fetchListingsSuccess(listingsData)); // Dispatch the data to Redux
      } catch (error) {
        dispatch(fetchListingsFailure(error.message)); // Dispatch error to Redux
      }
    };

    fetchListings();
  }, [dispatch]);

  const handleDelete = async (listingId, userId) => {
    if (currentUser.uid !== userId) {
      alert("You are not authorized to delete this listing.");
      return;
    }

    try {
      await deleteDoc(doc(db, "Listings", listingId)); // Delete the listing from Firestore
      dispatch(fetchListingsStart()); // Re-fetch listings to update UI
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

      dispatch(fetchListingsStart()); // Re-fetch listings to update UI
      setEditMode(null); // Exit edit mode
      alert("Listing updated successfully.");
    } catch (error) {
      alert(`Error updating listing: ${error.message}`);
    }
  };

  const handleMarkAsSold = async (listingId) => {
    try {
      await updateDoc(doc(db, "Listings", listingId), {
        sold: true, // Mark the listing as sold
      });

      dispatch(fetchListingsStart()); // Re-fetch listings to update UI
      alert("Listing marked as sold.");
    } catch (error) {
      alert(`Error marking listing as sold: ${error.message}`);
    }
  };

  const handlePurchase = async (listingId) => {
    if (!currentUser) {
      alert("You must be logged in to make a purchase.");
      return;
    }

    try {
      // This could be extended to create a purchase record, etc.
      await handleMarkAsSold(listingId); // Automatically mark as sold when purchased
      alert("Purchase successful! Thank you for buying this item.");
    } catch (error) {
      alert(`Error processing purchase: ${error.message}`);
    }
  };

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!Array.isArray(listings) || listings.length === 0) {
    return <p>No listings available.</p>;
  }

  return (
    <div>
      <h2>Listings</h2>
      <ul>
        {listings.map((listing, index) => (
          <li key={listing.id || `listing-${index}`} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h3>{listing.title}</h3>
            <p><strong>Description:</strong> {listing.description}</p>
            <p><strong>Price:</strong> ${listing.price.toFixed(2)}</p>
            <p><strong>Category:</strong> {listing.category}</p>
            {listing.sold && <p><strong>Status:</strong> Sold</p>}

            {/* Render Image if available (from Base64) */}
            {listing.imageBase64 ? (
              <div>
                <h4>Image:</h4>
                <img 
                  src={listing.imageBase64} 
                  alt={listing.title} 
                  style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }} 
                />
              </div>
            ) : (
              <p>No image available</p>
            )}

            {/* Conditional Buttons */}
            {currentUser && currentUser.uid === listing.userId ? (
              <>
                <button onClick={() => handleEdit(listing)}>Edit</button>
                <button onClick={() => handleDelete(listing.id, listing.userId)}>Delete</button>
                {!listing.sold && (
                  <button onClick={() => handleMarkAsSold(listing.id)}>Mark as Sold</button>
                )}
              </>
            ) : (
              <>
                {!listing.sold && (
                  <button onClick={() => handlePurchase(listing.id)}>Purchase</button>
                )}
                {listing.sold && <p>This item has been sold.</p>}
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Edit Form */}
      {editMode && (
        <div style={{ marginTop: "20px" }}>
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
            <button type="button" onClick={() => setEditMode(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListingList;
