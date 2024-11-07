// src/firebaseconfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_qD-Zm78oo7e9AG_d_TYP1j5DEB_fNIQ",
  authDomain: "math-market.firebaseapp.com",
  databaseURL: "https://math-market-default-rtdb.firebaseio.com",
  projectId: "math-market",
  storageBucket: "math-market.firebasestorage.app",
  messagingSenderId: "613647918436",
  appId: "1:613647918436:web:3a40d29e182478da278671",
  measurementId: "G-7SXGPJ8SNL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth,signOut  };
