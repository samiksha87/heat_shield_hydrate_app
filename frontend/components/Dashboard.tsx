// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import ChatBot from '../components/Chatbot';
import {Stats} from '../components/Stats';
import {WaterTracker} from '../components/WaterTracker';
import {Gamification} from '../components/Gamification';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Statistics');

  const tabs = ['Water Tracker', 'Health Guide', 'Rewards', 'Statistics'];

  const getContent = () => {
    switch (activeTab) {
      case 'Water Tracker': return <WaterTracker />;
      case 'Health Guide': return <ChatBot />;
      case 'Rewards': return <Gamification />;
      case 'Statistics': return <Stats />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between rounded-b-lg">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v13.5m0 0l-3.376-3.376M12 16.5l3.376-3.376M21 12c0 4.418-4.03 8-9 8a9 9 0 01-9-8c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h1 className="text-xl font-semibold text-gray-800">HeatShield Hydrate</h1>
        </div>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition duration-200">
          Sign out
        </button>
      </header>

      <nav className="flex justify-center mt-6 mb-8">
        <div className="flex bg-white p-2 rounded-xl shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 rounded-lg text-lg font-medium flex items-center justify-center transition duration-300 ease-in-out ${activeTab === tab ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        {getContent()}
      </main>
    </div>
  );
};

export default Dashboard;