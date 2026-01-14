import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
