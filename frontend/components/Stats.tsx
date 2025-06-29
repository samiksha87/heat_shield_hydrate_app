import { useState, useEffect } from "react";

export function Stats() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [weeklyStats, setWeeklyStats] = useState<any[]>([]);
  const [todayIntake, setTodayIntake] = useState<any>(null);

  useEffect(() => {
    // Mock user profile
    setUserProfile({
      dailyWaterGoal: 2000,
      healthConditions: ["Kidney Stone"],
    });

    // Mock today's intake
    setTodayIntake({
      total: 1500,
    });

    // Mock weekly stats
    setWeeklyStats([
      { date: "2024-06-23", totalIntake: 2000, goalAchieved: true, streak: 1 },
      { date: "2024-06-24", totalIntake: 2100, goalAchieved: true, streak: 2 },
      { date: "2024-06-25", totalIntake: 1500, goalAchieved: false, streak: 2 },
      { date: "2024-06-26", totalIntake: 2200, goalAchieved: true, streak: 3 },
      { date: "2024-06-27", totalIntake: 1800, goalAchieved: false, streak: 1 },
      { date: "2024-06-28", totalIntake: 2000, goalAchieved: true, streak: 2 },
      { date: "2024-06-29", totalIntake: 2300, goalAchieved: true, streak: 3 },
    ]);
  }, []);

  if (!userProfile || !weeklyStats || !todayIntake) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const currentStreak = weeklyStats.length > 0 ? weeklyStats[weeklyStats.length - 1]?.streak || 0 : 0;
  const weeklyAverage =
    weeklyStats.length > 0
      ? Math.round(weeklyStats.reduce((sum, day) => sum + day.totalIntake, 0) / weeklyStats.length)
      : 0;
  const goalsAchieved = weeklyStats.filter((day) => day.goalAchieved).length;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-bold text-orange-600">{currentStreak}</div>
          <p className="text-gray-600">Day Streak</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">📊</div>
          <div className="text-2xl font-bold text-blue-600">{weeklyAverage}ml</div>
          <p className="text-gray-600">Weekly Average</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-2xl font-bold text-green-600">{goalsAchieved}/7</div>
          <p className="text-gray-600">Goals This Week</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Progress</h3>
        <div className="space-y-4">
          {weeklyStats.map((day, index) => {
            const percentage = Math.min((day.totalIntake / userProfile.dailyWaterGoal) * 100, 100);
            const dayName = new Date(day.date).toLocaleDateString("en-US", { weekday: "short" });

            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-600">{dayName}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{day.totalIntake}ml</span>
                    <span>{day.goalAchieved ? "✅" : ""}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        day.goalAchieved
                          ? "bg-gradient-to-r from-green-400 to-emerald-500"
                          : "bg-gradient-to-r from-blue-400 to-cyan-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-right text-sm text-gray-600">
                  {Math.round(percentage)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Health Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Health Insights</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-gray-800">Hydration Status</h4>
              <p className="text-sm text-gray-600">
                {todayIntake.total >= userProfile.dailyWaterGoal
                  ? "Great job! You've met your daily hydration goal."
                  : `You need ${userProfile.dailyWaterGoal - todayIntake.total}ml more to reach your goal.`}
              </p>
            </div>
          </div>

          {currentStreak >= 3 && (
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <div className="text-2xl">🎉</div>
              <div>
                <h4 className="font-semibold text-gray-800">Streak Achievement</h4>
                <p className="text-sm text-gray-600">
                  Amazing! You're on a {currentStreak}-day hydration streak. Keep it up!
                </p>
              </div>
            </div>
          )}

          {userProfile.healthConditions.length > 0 && (
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl">⚠️</div>
              <div>
                <h4 className="font-semibold text-gray-800">Health Reminder</h4>
                <p className="text-sm text-gray-600">
                  Based on your health conditions ({userProfile.healthConditions.join(", ")}),
                  staying properly hydrated is especially important for you.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
