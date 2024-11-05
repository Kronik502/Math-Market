// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserProvider from "./context/usercontext.js"; // Ensure the import path includes the .js extension
import CreateListing from "./components/createlisting.js"; // Ensure the import path includes the .js extension
import Listings from "./components/listings.js"; // Ensure the import path includes the .js extension

const App = () => {
  return (
    <UserProvider>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Create Listing</Link>
          <Link to="/listings">View Listings</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Listings />} />
            <Route path="/create" element={<CreateListing />} />
            <Route path="/listings" element={<Listings />} />
          </Routes>
        </main>
      </Router>
    </UserProvider>
  );
};

export default App;
