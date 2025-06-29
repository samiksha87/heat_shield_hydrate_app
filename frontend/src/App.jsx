// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // 🔗 Submit to FastAPI backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://127.0.0.1:8000/user", {
//         email: email,
//         password: password
//       });
//       console.log("Signup success", res.data);
//       alert("Signup successful!");
//     } catch (err) {
//       console.error("Signup failed", err);
//       alert("Signup failed. Check console for details.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-300 to-cyan-200 flex flex-col">
//       {/* Header */}
//       <header className="bg-white/40 shadow px-8 py-5 flex items-center justify-between backdrop-blur-md">
//         <div className="flex items-center">
//           <img src="/drop-icon.png" alt="Logo" className="w-8 h-8 mr-3" />
//           <h1 className="text-xl font-extrabold text-blue-800 tracking-wide">
//             HeatShield Hydrate
//           </h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-1 justify-center items-center px-4">
//         <div className="w-full max-w-lg px-10 py-12 backdrop-blur-md rounded-2xl">
//           <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-4">
//             Stay Hydrated, Stay Safe
//           </h2>
//           <p className="text-center text-gray-700 text-lg mb-6 font-medium">
//             Your AI-powered hydration companion
//             <br />
//             <span className="text-sm text-gray-600">
//               Track water intake • Get health guidance • Earn rewards
//             </span>
//           </p>

//           <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition text-lg shadow-md"
//             >
//               Sign in
//             </button>
//           </form>

//           <p className="mt-5 text-sm text-center text-gray-700">
//             Don't have an account?{' '}
//             <a href="#" className="text-blue-700 font-semibold hover:underline">
//               Sign up instead
//             </a>
//           </p>

//           <div className="flex items-center my-6">
//             <hr className="flex-grow border-t border-gray-300" />
//             <span className="mx-3 text-gray-600 font-medium text-sm">or</span>
//             <hr className="flex-grow border-t border-gray-300" />
//           </div>

//           <button
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 w-full rounded-lg transition text-lg shadow-md"
//           >
//             Sign in anonymously
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;


import Dashboard from "../components/Dashboard";

function App() {
  return (
    <div>
      {/* Other components */}
      <Dashboard />
    </div>
  );
}

// export default App;
// // import HydrationTracker from "../components/HydrationTracker";

// // function App() {
// //   return (
// //     <div>
// //       {/* Other components */}
// //       <HydrationTracker />
// //     </div>
// //   );
// // }

 export default Dashboard;
