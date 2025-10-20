// client/src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "./utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 앱 시작 시 토큰 유효성 검사
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          // 서버에 토큰 검증용 요청(예: /users/me)
          const res = await api.get("/users/me");
          setUser(res.data);
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, []);

  const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    api.post("/users/logout", { refreshToken }).catch(() => {});
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
