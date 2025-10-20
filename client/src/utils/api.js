import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// 요청 인터셉터: 토큰을 헤더에 포함
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
