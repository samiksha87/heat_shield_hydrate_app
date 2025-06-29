

const ProfileForm = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-2">Set Up Your Profile</h2>
        <p className="text-center text-gray-500 mb-6">Help us personalize your hydration goals</p>

        <form className="space-y-6">
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Enter your age"
              className="w-1/2 p-3 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Enter your weight"
              className="w-1/2 p-3 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Activity Level</label>
            <select className="w-full p-3 border rounded">
              <option>Moderate (Light exercise)</option>
              <option>Low (Sedentary)</option>
              <option>High (Heavy exercise)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Health Conditions (Select all that apply)</label>
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              {[
                "Diabetes",
                "Hypertension",
                "Heart Disease",
                "Kidney Disease",
                "Pregnancy",
                "Elderly (65+)",
                "Outdoor Worker",
                "Athlete",
              ].map((condition) => (
                <label key={condition} className="flex items-center gap-2">
                  <input type="checkbox" />
                  {condition}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded hover:opacity-90 transition"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;