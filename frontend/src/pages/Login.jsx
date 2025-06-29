import React, { useState } from "react";
import axios from "../services/axios";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/login",
        new URLSearchParams(formData),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      localStorage.setItem("token", res.data.access_token);
      alert("Login successful");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="border p-2 w-full rounded"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="border p-2 w-full rounded"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
        Login
      </button>
    </form>
  );
};

export default Login;