import React from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

const experts = [
  { id: 1, username: "Park", skill: "Funiture", rating: 4.9 },
  { id: 2, username: "Kim", skill: "Electornic", rating: 4.8 },
  { id: 3, username: "Lee", skill: "Cleaning", rating: 4.7 },
];

const MainPage = () => {
  const [query, setQuery] = React.useState("");

  const filteredExperts = experts.filter(
    (expert) => expert.username.includes(query) || expert.skill.includes(query)
  );

  return (
    <>
      <NavBar />
      <div>
        <h1>Hidden Pro - Expert Market Place</h1>

        <input
          type="text"
          placeholder="Search.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <section>
          <h2>Recommand Pro</h2>
          <ul>
            {filteredExperts.map((expert) => (
              <li key={expert.id}>
                {/* 전문가 이름에 상세페이지로 이동하는 Link 추가 */}
                <Link
                  to={`/experts/${expert.id}`}
                  style={{ fontWeight: "bold" }}
                >
                  {expert.username}
                </Link>
                {" - "}
                {expert.skill} (Rate: {expert.rating})
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default MainPage;
