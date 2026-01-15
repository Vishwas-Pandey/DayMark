import React, { useState, useRef } from "react";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const submittingRef = useRef(false); // 🛑 prevents double submit

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) return; // 🚫 HARD STOP
    submittingRef.current = true;

    setLoading(true);

    const endpoint = isRegister ? "/auth/register" : "/auth/login";

    const payload = isRegister
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const { data } = await API.post(endpoint, payload);

      login(data); // ✅ SINGLE SOURCE OF TRUTH
      toast.success(`Welcome, ${data.name || "back"}!`);
      // ❌ NO navigate here
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed");
      submittingRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Toaster position="top-center" />

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl border">
        <h2 className="mb-2 text-center text-3xl font-bold">DayMark</h2>

        <p className="mb-8 text-center text-gray-500">
          {isRegister ? "Start your journey" : "Welcome back"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Register" : "Log In"}
          </button>
        </form>

        <button onClick={toggleMode} className="mt-4 text-sm text-gray-500">
          {isRegister
            ? "Already have an account? Log in"
            : "New here? Create account"}
        </button>
      </div>
    </div>
  );
};

export default Login;
