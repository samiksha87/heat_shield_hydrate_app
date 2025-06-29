import React, { useEffect, useState } from "react";
import axios from "../services/axios";

const HydrationHistory = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/log/history", {
          headers: { Authorization: `Bearer ${token}` }, // ✅ fixed line
        });
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Hydration Logs</h2>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="bg-gray-100 p-2 rounded">
            💧 {log.count} glasses ({log.amount_ml} ml) at{" "}
            {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HydrationHistory;
