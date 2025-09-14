import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("accessToken", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      setErrorMsg("");
      navigate("/main"); // 로그인 성공 후 메인페이지로 이동
    } catch (err) {
      setErrorMsg("로그인 실패: 이메일이나 비밀번호를 확인하세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
