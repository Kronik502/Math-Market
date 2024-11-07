import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseconfig.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    surname: '',
    email: '',
    address: '',
    cellNumber: '',
    dob: '',
    gender: '',
    photoURL: null, 
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid); // 'users' collection in Firestore
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserDetails(userDocSnap.data());
          setFormData(userDocSnap.data()); // Set formData with Firestore data
        } else {
          console.log('No user profile found in Firestore');
        }
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result;
        setFormData((prev) => ({
          ...prev,
          photoURL: base64Image,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, 'users', user.uid);

      try {
        await updateDoc(userRef, formData);
        alert('Profile updated successfully!');
        setIsEditing(false);
        setLoading(false);
      } catch (error) {
        console.error("Error updating profile: ", error);
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return (
      <div>
        <h1>Welcome! Please fill in your profile details.</h1>
        <form onSubmit={handleUpdateProfile}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="cellNumber"
              value={formData.cellNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label>Profile Picture</label>
            <input type="file" onChange={handlePhotoChange} />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Save Profile'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1>{`Welcome, ${userDetails.fullName || 'User'}`}</h1>

      <div className="profile-info">
        <div>
          {userDetails.photoURL ? (
            <img
              src={userDetails.photoURL}
              alt="Profile"
              style={{ width: 100, height: 100, borderRadius: '50%' }}
            />
          ) : (
            <div style={{ width: 100, height: 100, borderRadius: '50%', backgroundColor: '#ccc' }}></div>
          )}
        </div>
        {isEditing ? (
          <form onSubmit={handleUpdateProfile}>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Surname</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                name="cellNumber"
                value={formData.cellNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label>Profile Picture</label>
              <input type="file" onChange={handlePhotoChange} />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        ) : (
          <div>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Full Name:</strong> {userDetails.fullName} {userDetails.surname}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
            <p><strong>Phone:</strong> {userDetails.cellNumber}</p>
            <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
            <p><strong>Gender:</strong> {userDetails.gender}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
