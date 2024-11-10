import React, { useState } from 'react';
import { auth, db, storage } from '../firebaseconfig.js'; // Import Firestore
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const ProfileModal = ({ closeModal }) => {
  const [fullName, setFullName] = useState('');
  const [surname, setSurname] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsUploading(true);

      // Upload image if selected
      let profilePicUrl = '';
      if (profilePicture) {
        const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, profilePicture);
        profilePicUrl = await getDownloadURL(storageRef);
      }

      // Update user profile in Firebase Authentication
      await updateProfile(auth.currentUser, {
        displayName: fullName, // Only full name
        photoURL: profilePicUrl || auth.currentUser.photoURL, // Existing photo if no upload
      });

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        fullName,
        surname,
        cellNumber,
        gender,
        dob,
        address,
        photoURL: profilePicUrl || auth.currentUser.photoURL, // Save profile picture URL to Firestore
      });

      setIsUploading(false);
      closeModal(); // Close the modal after saving
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsUploading(false);
    }
  };

  return (
    <div className="profile-modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </label>
          <label>
            Surname:
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Enter your surname"
            />
          </label>
          <label>
            Cell Number:
            <input
              type="text"
              value={cellNumber}
              onChange={(e) => setCellNumber(e.target.value)}
              placeholder="Enter your cell number"
            />
          </label>
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </label>
          <label>
            Residential Address:
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your residential address"
            />
          </label>
          <label>
            Profile Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Save Changes'}
          </button>
        </form>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;
