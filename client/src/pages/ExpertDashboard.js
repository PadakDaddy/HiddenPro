import React from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Dashboard.css";

const ExpertDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h1>Expert Dashboard</h1>
        <p>Welcome, {user?.username}!</p>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>My profile</h3>
            <p>Add and modified profile information.</p>
            <button>Manage profile</button>
          </div>
          <div className="dashboard-card">
            <h3>Request service</h3>
            <p>Check the customer's request</p>
            <button>Request confirm</button>
          </div>
          <div className="dashboard-card">
            <h3>Task in process</h3>
            <p>Manage your current tasks.</p>
            <button>Task management</button>
          </div>
          <div className="dashboard-card">
            <h3>Profit</h3>
            <p>Check your total profit.</p>
            <button>Profit check</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertDashboard;
