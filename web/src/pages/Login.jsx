import React, { useState, useEffect, useRef } from "react";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // 🛑 Logic: Ref to prevent double submission
  const submittingRef = useRef(false);

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ Logic: Auto-redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Logic: Hard Stop if already submitting
    if (submittingRef.current) return;
    submittingRef.current = true;

    setLoading(true);

    const endpoint = isRegister ? "/auth/register" : "/auth/login";

    // Prepare payload based on mode
    const payload = isRegister
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const { data } = await API.post(endpoint, payload);

      // ✅ Logic: Update Context (App.js will react to this)
      login(data);

      toast.success(`Welcome, ${data.name || "back"}!`);

      // Note: We don't need manual navigation here because the
      // useEffect above will trigger as soon as 'login(data)' updates the user state.
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Authentication failed");
      // Reset ref so they can try again if it failed
      submittingRef.current = false;
    } finally {
      setLoading(false);
      // We don't reset submittingRef to false on success immediately
      // to prevent clicking while the page transitions.
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  // 👇 VISUALS: This is the exact design you wanted
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Toaster position="top-center" />

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl border border-gray-100">
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
          DayMark
        </h2>

        <p className="mb-8 text-center text-gray-500">
          {isRegister
            ? "Start your consistency journey"
            : "Welcome back to your plan"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
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
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 font-bold text-white hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Account"
              : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={toggleMode}
            className="text-gray-500 hover:text-black hover:underline transition-colors"
          >
            {isRegister
              ? "Already have an account? Log In"
              : "New here? Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
