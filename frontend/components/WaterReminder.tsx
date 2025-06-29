// Reminder.tsx
import { useEffect } from "react";

export default function WaterReminder() {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    const showNotification = () => {
      if (Notification.permission === "granted") {
        new Notification("💧 Time to hydrate!", {
          body: "Drink a glass of water 🥤",
        });
      }
    };

    const interval = setInterval(showNotification, 5000); // 5 seconds

    showNotification();

    return () => clearInterval(interval);
  }, []);

  return null; // no visible UI
}
