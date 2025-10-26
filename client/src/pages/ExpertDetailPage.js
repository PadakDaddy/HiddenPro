import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import NavBar from "../components/NavBar";
import "./ExpertDetailPage.css";

const ExpertDetailPage = () => {
  const { id } = useParams();
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!expert) return <div>Sorry.. Can not find expert..</div>;

  return (
    <>
      <NavBar />
      <div className="expert-detail">
        <h1>{expert.username} – Expert Details</h1>
        {expert.profileImage && (
          <img
            src={expert.profileImage}
            alt="Profile"
            className="profile-img"
          />
        )}
        <p>
          <strong>Email:</strong> {expert.email}
        </p>
        <p>
          <strong>Category:</strong> {expert.category || "N/A"}
        </p>
        <p>
          <strong>Skills:</strong> {expert.skills || "N/A"}
        </p>
        <p>
          <strong>Rating:</strong>{" "}
          {expert.rating ? expert.rating.toFixed(1) : "N/A"}
        </p>
        <div>
          <strong>Bio:</strong>
          <br />
          {expert.bio || "No bio provided."}
        </div>
        {
          /* Add buttons or sections for 'Request Quote', 'Message', etc. */
          <button className="cta-btn" onClick={() => alert("Coming soon!")}>
            Send Inquiry
          </button>
        }
      </div>
    </>
  );
};

export default ExpertDetailPage;
