import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import NavBar from "../components/NavBar";
import "../styles/ExpertDetailPage.css";

const ExpertDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setExpert(response.data);
        setLoading(false);
      } catch (err) {
        setError("Fail to loading expert information");
        setLoading(false);
      }
    };
    fetchExpert();
  }, [id]);

  const handleContact = () => {
    alert(`Send inquiry to ${expert.username}`);
  };

  const handleBackClick = () => {
    navigate("/main");
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <>
        <NavBar />
        <div className="error-container">
          <p>{error}</p>
          <button onClick={handleBackClick}>Back to Main</button>
        </div>
      </>
    );
  if (!expert)
    return (
      <>
        <NavBar />
        <div className="error-container">
          <p>Can't find Expert</p>
          <button onClick={handleBackClick}>Back to Main</button>
        </div>
      </>
    );

  return (
    <>
      <NavBar />
      <div className="expert-detail-container">
        <button className="back-button" onClick={handleBackClick}>
          ← Back
        </button>

        <div className="expert-card">
          {expert.profileImage && (
            <img
              src={expert.profileImage}
              alt={expert.username}
              className="profile-image"
            />
          )}

          <div className="expert-info">
            <h1>{expert.username}</h1>
            <div className="expert-meta">
              {expert.skill && (
                <div className="meta-item">
                  <strong>Skill:</strong> <span>{expert.skill}</span>
                </div>
              )}

              {expert.category && (
                <div className="meta-item">
                  <strong>Category:</strong> <span>{expert.category}</span>
                </div>
              )}

              <div className="meta-item">
                <strong>Rate:</strong>
                <span className="rating">
                  {"⭐".repeat(Math.floor(expert.rating))} ({expert.rating}/5)
                </span>
              </div>

              <div className="meta-item">
                <strong>Email:</strong> <span>{expert.email}</span>
              </div>
            </div>
            {expert.bio && (
              <div className="bio-section">
                <h3>Introduction</h3>
                <p>{expert.bio}</p>
              </div>
            )}
            <button className="cta-btn" onClick={() => alert("Coming soon!")}>
              Send Inquiry
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertDetailPage;
