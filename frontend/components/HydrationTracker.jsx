
import { useEffect, useRef, useState } from "react";
import * as handTrack from "handtrackjs";
const logToBackend = async (count) => {
  try {
    const res = await fetch("http://localhost:8000/hydration/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ count })
    });

    if (!res.ok) throw new Error("Failed to log hydration");
    console.log("✅ Logged hydration count to backend");
  } catch (error) {
    console.error("❌ Logging error:", error);
  }
};

const HydrationTracker = () => {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [count, setCount] = useState(0);
  const [recentlyDetected, setRecentlyDetected] = useState(false);

  useEffect(() => {
    handTrack.startVideo(videoRef.current).then((status) => {
      if (status) {
        handTrack.load({
          flipHorizontal: true,
          maxNumBoxes: 1,
          scoreThreshold: 0.75,
        }).then(setModel);
      } else {
        alert("Please enable webcam access.");
      }
    });
  }, []);

  useEffect(() => {
    if (model) {
      const interval = setInterval(() => {


        model.detect(videoRef.current).then(predictions => {
          if (predictions.length > 0) {
            const [x, y] = predictions[0].bbox;
            if (y < 150 && !recentlyDetected) {
              setCount(prev => prev + 1);
              setRecentlyDetected(true);
              setTimeout(() => setRecentlyDetected(false), 3000);
            }
          }
        });

        if (y < 150 && !recentlyDetected) {
  setCount(prev => prev + 1);
  logToBackend(count + 1);  // ✅ Send updated count to backend
  setRecentlyDetected(true);
  setTimeout(() => setRecentlyDetected(false), 3000);
}

      }, 1000);

      return () => clearInterval(interval);
    }
  }, [model, recentlyDetected]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-50">
      <h1 className="text-3xl font-bold text-sky-700 mb-4">💧 Hydration Tracker</h1>
      <video ref={videoRef} width="640" height="480" className="rounded shadow-lg" autoPlay muted></video>
      <p className="mt-4 text-xl text-gray-700 font-semibold">
        Times Simulated Drinking: <span className="text-blue-600">{count}</span>
      </p>
    </div>
  );
};

export default HydrationTracker; 