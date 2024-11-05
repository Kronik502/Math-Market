import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingsStart, fetchListingsSuccess, fetchListingsFailure } from "../Redux/slices/listingslices.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig.js"; // Ensure correct import path

const ListingList = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.listings);
  const loading = useSelector((state) => state.listings.loading);
  const error = useSelector((state) => state.listings.error);

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

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!Array.isArray(listings) || listings.length === 0) {
    return <p>No listings available.</p>;
  }

  return (
    <div>
      <h2>Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
            <img src={listing.imageUrl} alt={listing.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingList;
