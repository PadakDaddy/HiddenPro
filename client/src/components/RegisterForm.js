import React, { useState } from "react";
import api from "../utils/api";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", { username, email, password });
      setSuccessMsg("Sign-up Success! move to login page");
      setErrorMsg("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(`Sign-up failed: ${err.response.data.error}`);
      } else {
        setErrorMsg("Sign-up failed: Enter value again.");
      }
      setSuccessMsg("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
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
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      <button type="submit">Sign-up</button>
    </form>
  );
};

export default RegisterForm;
