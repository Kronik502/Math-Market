import React, { useState, useEffect } from 'react';
import { db } from '../firebaseconfig.js';
import { doc, getDoc } from 'firebase/firestore';

const ConfirmationPage = ({ buyerId, listerId, itemId }) => {
  const [buyerDetails, setBuyerDetails] = useState(null);
  const [listerDetails, setListerDetails] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fetchUserDetails = async (userId, setUserDetails) => {
          const userDocRef = doc(db, 'users', userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserDetails(userDocSnap.data());
          } else {
            console.log(`No user profile found for ID: ${userId}`);
          }
        };

        const fetchItemDetails = async () => {
          const itemDocRef = doc(db, 'items', itemId); // 'items' collection in Firestore
          const itemDocSnap = await getDoc(itemDocRef);
          if (itemDocSnap.exists()) {
            setItemDetails(itemDocSnap.data());
          } else {
            console.log(`No item found with ID: ${itemId}`);
          }
        };

        await Promise.all([
          fetchUserDetails(buyerId, setBuyerDetails),
          fetchUserDetails(listerId, setListerDetails),
          fetchItemDetails()
        ]);
      } catch (error) {
        console.error("Error fetching details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [buyerId, listerId, itemId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="confirmation-page">
      <h1>Transaction Confirmation</h1>

      <h2>Item Details</h2>
      {itemDetails ? (
        <div>
          <p><strong>Item Name:</strong> {itemDetails.name}</p>
          <p><strong>Price:</strong> ${itemDetails.price}</p>
          <p><strong>Description:</strong> {itemDetails.description}</p>
          {/* Display additional item details as needed */}
        </div>
      ) : (
        <p>No item details found.</p>
      )}

      <h2>Buyer Details</h2>
      {buyerDetails ? (
        <div>
          <p><strong>Full Name:</strong> {buyerDetails.fullName} {buyerDetails.surname}</p>
          <p><strong>Email:</strong> {buyerDetails.email}</p>
          <p><strong>Phone:</strong> {buyerDetails.cellNumber}</p>
          <p><strong>Address:</strong> {buyerDetails.address}</p>
          {/* Display additional buyer details as needed */}
        </div>
      ) : (
        <p>No buyer details found.</p>
      )}

      <h2>Lister Details</h2>
      {listerDetails ? (
        <div>
          <p><strong>Full Name:</strong> {listerDetails.fullName} {listerDetails.surname}</p>
          <p><strong>Email:</strong> {listerDetails.email}</p>
          <p><strong>Phone:</strong> {listerDetails.cellNumber}</p>
          <p><strong>Address:</strong> {listerDetails.address}</p>
          {/* Display additional lister details as needed */}
        </div>
      ) : (
        <p>No lister details found.</p>
      )}
    </div>
  );
};

export default ConfirmationPage;
