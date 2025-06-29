import { useState, useEffect } from "react";
import { toast } from "sonner";

export function WaterTracker() {
  const [amount, setAmount] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [todayIntake, setTodayIntake] = useState({
    total: 0,
    logs: [] as { timestamp: number; amount: number }[],
  });

  // Simulated user profile
  const userProfile = {
    dailyWaterGoal: 2000, // ml
    notificationEnabled: true,
    lastNotificationTime: 0,
  };

  const quickAmounts = [250, 500, 750, 1000];

  // Notification system
  useEffect(() => {
    if (!userProfile.notificationEnabled) return;

    const checkNotification = () => {
      const now = new Date();
      const hoursSinceLastNotification =
        (now.getTime() - userProfile.lastNotificationTime) / (1000 * 60 * 60);

      if (hoursSinceLastNotification >= 1) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    };

    const interval = setInterval(checkNotification, 60000); // every minute
    return () => clearInterval(interval);
  }, []);

  const handleLogWater = async (waterAmount: number) => {
    try {
      const now = Date.now();
      const updatedLogs = [...todayIntake.logs, { timestamp: now, amount: waterAmount }];
      const updatedTotal = todayIntake.total + waterAmount;
      setTodayIntake({ total: updatedTotal, logs: updatedLogs });
      toast.success(`Logged ${waterAmount}ml! 💧`);
      setAmount("");
    } catch {
      toast.error("Failed to log water intake");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waterAmount = parseInt(amount);
    if (waterAmount > 0) {
      handleLogWater(waterAmount);
    }
  };

  const progressPercentage = Math.min((todayIntake.total / userProfile.dailyWaterGoal) * 100, 100);
  const remainingAmount = Math.max(userProfile.dailyWaterGoal - todayIntake.total, 0);

  return (
    <div className="space-y-6">
      {/* Notification */}
      {showNotification && (
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💧</span>
            <div>
              <p className="font-semibold">Time to hydrate!</p>
              <p className="text-sm opacity-90">Don't forget to drink water regularly</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Today's Progress</h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {todayIntake.total}ml
          </div>
          <p className="text-gray-600">of {userProfile.dailyWaterGoal}ml goal</p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {remainingAmount > 0 ? `${remainingAmount}ml remaining` : "Goal achieved! 🎉"}
          </p>
        </div>
      </div>

      {/* Log Water */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Log Water Intake</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => handleLogWater(quickAmount)}
              className="bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 text-blue-700 py-3 px-4 rounded-lg font-semibold transition-all duration-200"
            >
              {quickAmount}ml
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Custom amount (ml)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
          >
            Log
          </button>
        </form>
      </div>

      {/* Recent Logs */}
      {todayIntake.logs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Logs</h3>
          <div className="space-y-2">
            {todayIntake.logs.slice(-5).reverse().map((log, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-gray-600">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span className="font-semibold text-blue-600">{log.amount}ml</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
