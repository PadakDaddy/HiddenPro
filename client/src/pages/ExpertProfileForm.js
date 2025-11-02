import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import api from "../utils/api";
import NavBar from "../components/NavBar";
import "../styles/ExpertProfileForm.css";

const ExpertProfileForm = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    skill: "",
    category: "",
    bio: "",
    profileImage: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // load existing profile data if editing
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${user.id}`);
        const userData = response.data;

        if (userData.skill || userData.category || userData.bio) {
          setIsEditing(true);
          setFormData({
            skill: userData.skill || "",
            category: userData.category || "",
            bio: userData.bio || "",
            profileImage: userData.profileImage || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await api.put(`/users/${user.id}`, formData);
      setSuccessMsg(
        isEditing
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );

      // Update user context
      setUser((prev) => ({
        ...prev,
        ...formData,
      }));

      setTimeout(() => {
        navigate("/expert-dashboard");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(`Error: ${err.response.data.error}`);
      } else {
        setErrorMsg("Failed to submit profile. Please try again.");
      }
    }
  };

  const categories = [
    "Convenience",
    "Electrical/Plumbing",
    "Cleaning",
    "Moving",
    "Interior/Exterior",
    "IT/Computer",
    "Lesson/Tutoring",
    "Design/Photography",
    "Etc",
  ];

  return (
    <>
      <NavBar />
      <div className="profile-form-container">
        <h1>{isEditing ? "Edit Profile" : "Register Profile"}</h1>
        <p className="subtitle"> Input Expert's Profile</p>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="skill">Expert Skill*</label>
            <input
              id="skill"
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              placeholder="ex: Plumbing, Electrical, Cleaning..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Choice</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Introduction *</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write a brief introduction about yourself..."
              rows="6"
              required
            />
            <small className="char-count">{formData.bio.length}/500</small>
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile image URL</label>
            <input
              id="profileImage"
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="https://example.com/profile.jpg"
            />
            {formData.profileImage && (
              <div className="image-preview">
                <img src={formData.profileImage} alt="Preview" />
              </div>
            )}
          </div>

          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}

          <div className="button-group">
            <button type="submit" className="submit-button">
              {isEditing ? "Complete edit" : "Complete registration"}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/expert-dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExpertProfileForm;
