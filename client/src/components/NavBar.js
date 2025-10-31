// client/src/components/NavBar.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../styles/NavBar.css";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleDashboard = () => {
    if (user?.role === "expert") {
      navigate("/expert-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/main" className="navbar-logo">
          HiddenPro
        </Link>

        <div className="navbar-menu">
          {user ? (
            <>
              <span className="user-info">
                {user.username} (
                {user.role === "expert" ? "Expert" : "Customer"})
              </span>
              <button className="nav-button" onClick={handleDashboard}>
                {user.role === "expert"
                  ? "Expert dashboard"
                  : "Customer dashboard"}
              </button>
              <button
                className="nav-button logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button className="nav-button" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
