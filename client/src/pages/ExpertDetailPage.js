import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import NavBar from "../components/NavBar";

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
      <div>
        <h1>{expert.username} Detailed export Information</h1>
        <p>
          <strong>E-mail:</strong> {expert.email}
        </p>
        <p>
          <strong>Role:</strong> {expert.role}
        </p>
        {/* 필요에 따라 추가 정보 표시 */}
      </div>
    </>
  );
};

export default ExpertDetailPage;
