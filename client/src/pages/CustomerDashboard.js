import React from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Dashboard.css";

const CustomerDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h1>Customer Dashboard</h1>
        <p>Welcome, {user?.username}!</p>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Request Service</h3>
            <p>Call a Expert for services</p>
            <button>Request</button>
          </div>
          <div className="dashboard-card">
            <h3>Service in progress</h3>
            <p>Chekck the current service</p>
            <button>View progress</button>
          </div>
          <div className="dashboard-card">
            <h3>Completed services</h3>
            <p>Check completed services and reviews.</p>
            <button>Completed services</button>
          </div>
          <div className="dashboard-card">
            <h3>Favorite</h3>
            <p>Save favortie experts.</p>
            <button>Favorite</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
