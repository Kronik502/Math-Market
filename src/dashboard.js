import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const Dashboard = () => {
  const { userRole } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {userRole === "seller" && <p>Welcome, Seller!</p>}
      {userRole === "buyer" && <p>Welcome, Buyer!</p>}
      {userRole === "admin" && <p>Welcome, Admin!</p>}
    </div>
  );
};

export default Dashboard;
