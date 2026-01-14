import axios from "axios";

// ✅ Best Practice: Use the environment variable
// We add a fallback to localhost so it works on your machine without crashing
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token ONLY if it exists AND route is protected
API.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");

  if (
    user &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register")
  ) {
    const parsed = JSON.parse(user);
    if (parsed?.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }

  return config;
});

export default API;
