import React, { useState } from "react";
import axios from "../services/axios";

const HydrationLog = () => {
  const [count, setCount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/log",
        { count: parseInt(count) },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ fixed token header
          },
        }
      );
      alert("Hydration logged!");
    } catch (err) {
      alert("Error logging hydration");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center">Hydration Log</h2>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        placeholder="Number of Glasses"
        className="border p-2 w-full rounded"
        required
      />
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded w-full transition duration-200"
      >
        Log Water
      </button>
    </form>
  );
};

export default HydrationLog;
