import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import api from "../utils/api";
import NavBar from "../components/NavBar";
import "./styles/ExpertProfileForm.css";

const ExpertProfileForm = () => {
  const { user } = useContext(AuthContext);

  // Load existing profile data if available
  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/${user.id}`);
        setSkill(res.data.skill || "");
        setCategory(res.data.category || "");
        setBio(res.data.bio || "");
        setProfileImage(res.data.profileImage || "");
      } catch (e) {
        setError("Failed to load profile data.");
      }
    };
    if (user.role === "expert") fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${user.id}`, {
        skill,
        category,
        bio,
        profileImage,
      });
      setSuccess("Profile updated successfully.");
      setError("");
    } catch (err) {
      setError("Failed to update profile.");
      setSuccess("");
    }
  };

  if (user.role !== "expert") {
    return (
      <>
        <NavBar />
        <div style={{ padding: 40, textAlign: "center" }}>
          Only experts can access this page.
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="expert-profile-form-container">
        <h2>Expert Profile</h2>
        <form onSubmit={handleSubmit} className="expert-profile-form">
          <div className="form-group">
            <label>Skill</label>
            <input
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Bio (Introduce)</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
            />
          </div>
          <div className="form-group">
            <label>Profile Image URL</label>
            <input
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Save Profile
          </button>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default ExpertProfileForm;
