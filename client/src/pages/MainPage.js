import React from "react";

const experts = [
  { id: 1, name: "Park", skill: "Funiture", rating: 4.9 },
  { id: 2, name: "Kim", skill: "Electornic", rating: 4.8 },
  { id: 3, name: "Lee", skill: "Cleaning", rating: 4.7 },
];

const MainPage = () => {
  const [query, setQuery] = React.useState("");
  const [selectedExpert, setSelectedExpert] = React.useState(null);

  const filteredExperts = experts.filter(
    (expert) => expert.name.includes(query) || expert.skill.includes(query)
  );

  return (
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
              <strong>{expert.name}</strong> - {expert.skill} (Rate:{" "}
              {expert.rating})
              <button onClick={() => setSelectedExpert(expert)}>Detail</button>
            </li>
          ))}
        </ul>
      </section>

      {selectedExpert && (
        <section>
          <h3>{selectedExpert.name} Detail of Pro</h3>
          <p>Skill: {selectedExpert.skill}</p>
          <p>Rate: {selectedExpert.rating}</p>
          <button onClick={() => setSelectedExpert(null)}>Close</button>
        </section>
      )}
    </div>
  );
};

export default MainPage;
