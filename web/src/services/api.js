import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "https://daymark.onrender.com", // 🔴 CHANGE THIS
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token
API.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");

  if (user) {
    const parsed = JSON.parse(user);
    if (parsed?.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }

  return config;
});

export default API;
