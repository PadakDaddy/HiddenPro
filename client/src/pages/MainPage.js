import React from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import "../styles/MainPage.css";

const experts = [
  { id: 1, username: "Park", skill: "Funiture", rating: 4.9 },
  { id: 2, username: "Kim", skill: "Electornic", rating: 4.8 },
  { id: 3, username: "Lee", skill: "Cleaning", rating: 4.7 },
];

const MainPage = () => {
  const [query, setQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const filteredExperts = experts.filter(
    (expert) =>
      (expert.username.includes(query) || expert.skill.includes(query)) &&
      (selectedCategory === "" || expert.category === selectedCategory)
  );
  const categories = ["Life", "Electoronic", "Cleaning"];

  return (
    <>
      <NavBar />
      <div className="main-container">
        <h1>Hidden Pro - Expert Market Place</h1>

        <input
          type="text"
          placeholder="Search.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-section">
        <h3>Category</h3>
        <div className="category-buttons">
          <button
            className={selectedCategory === "" ? "active" : ""}
            onClick={() => setSelectedCategory("")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="experts-section">
        <h2>Recommand Expert</h2>
        {filteredExperts.length === 0 ? (
          <p className="no-results">No results found.</p>
        ) : (
          <div className="experts-grid">
            {filteredExperts.map((expert) => (
              <Link
                to={`/experts/${expert.id}`}
                key={expert.id}
                className="expert-item-link"
              >
                <div className="expert-item">
                  <h3>{expert.username}</h3>
                  <p className="skill">{expert.skill}</p>
                  <p className="category">{expert.category}</p>
                  <div className="rating">
                    {"⭐".repeat(Math.floor(expert.rating))} {expert.rating}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
