import React from "react";

const experts = [
  { id: 1, name: "홍길동", skill: "가구 조립", rating: 4.9 },
  { id: 2, name: "김철수", skill: "전기", rating: 4.8 },
  { id: 3, name: "박영희", skill: "청소", rating: 4.7 },
];

const MainPage = () => {
  const [query, setQuery] = React.useState("");
  const [selectedExpert, setSelectedExpert] = React.useState(null);

  const filteredExperts = experts.filter(
    (expert) => expert.name.includes(query) || expert.skill.includes(query)
  );

  return (
    <div>
      <h1>숨은 고수 - 전문가 마켓플레이스</h1>

      <input
        type="text"
        placeholder="검색어 입력"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <section>
        <h2>추천 전문가</h2>
        <ul>
          {filteredExperts.map((expert) => (
            <li key={expert.id}>
              <strong>{expert.name}</strong> - {expert.skill} (평점:{" "}
              {expert.rating})
              <button onClick={() => setSelectedExpert(expert)}>
                상세보기
              </button>
            </li>
          ))}
        </ul>
      </section>

      {selectedExpert && (
        <section>
          <h3>{selectedExpert.name} 전문가 상세</h3>
          <p>기술: {selectedExpert.skill}</p>
          <p>평점: {selectedExpert.rating}</p>
          <button onClick={() => setSelectedExpert(null)}>닫기</button>
        </section>
      )}
    </div>
  );
};

export default MainPage;
