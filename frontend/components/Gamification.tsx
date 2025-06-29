import { useState, useEffect } from "react";

export function Gamification() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [rewards, setRewards] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    // Simulated user data
    setUserProfile({
      level: 3,
      totalPoints: 2350,
    });

    // Simulated rewards
    setRewards([
      {
        _id: "1",
        rewardType: "badge",
        title: "Starter Badge",
        description: "Earned for logging water 5 times",
        isUnlocked: true,
        unlockedAt: new Date().toISOString(),
        pointsRequired: 0,
      },
      {
        _id: "2",
        rewardType: "achievement",
        title: "Hydration Hero",
        description: "Earned for drinking 5L in a day",
        isUnlocked: false,
        pointsRequired: 3000,
      },
    ]);

    // Simulated leaderboard
    setLeaderboard([
      { name: "Samiksha", level: 5, points: 4500 },
      { name: "Mayuri", level: 4, points: 3400 },
      { name: "Somesh", level: 3, points: 2700 },
    ]);
  }, []);

  if (!userProfile || rewards.length === 0) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const nextLevelPoints = userProfile.level * 1000;
  const currentLevelProgress = userProfile.totalPoints % 1000;
  const progressPercentage = (currentLevelProgress / 1000) * 100;

  const unlockedRewards = rewards.filter(r => r.isUnlocked);
  const lockedRewards = rewards.filter(r => !r.isUnlocked);

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">🏆</div>
          <h3 className="text-2xl font-bold text-gray-800">Level {userProfile.level}</h3>
          <p className="text-gray-600">{userProfile.totalPoints} total points</p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress to Level {userProfile.level + 1}</span>
            <span>{currentLevelProgress}/1000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Unlocked Rewards */}
      {unlockedRewards.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🎉 Unlocked Rewards</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {unlockedRewards.map((reward) => (
              <div key={reward._id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">
                    {reward.rewardType === "badge" ? "🏅" :
                      reward.rewardType === "achievement" ? "🏆" : "⭐"}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{reward.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                    <p className="text-xs text-green-600">
                      Unlocked {reward.unlockedAt ? new Date(reward.unlockedAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Rewards */}
      {lockedRewards.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🔒 Upcoming Rewards</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {lockedRewards.map((reward) => (
              <div key={reward._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 opacity-75">
                <div className="flex items-start gap-3">
                  <div className="text-2xl grayscale">
                    {reward.rewardType === "badge" ? "🏅" :
                      reward.rewardType === "achievement" ? "🏆" : "⭐"}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{reward.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                    <p className="text-xs text-blue-600">
                      {reward.pointsRequired} points required
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {leaderboard && leaderboard.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🏅 Leaderboard</h3>
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">Level {user.level}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{user.points}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
