import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token ONLY if it exists AND route is protected
API.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");

  // ❌ Do NOT attach token for auth routes
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
