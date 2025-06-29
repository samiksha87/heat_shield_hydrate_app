import React, { useState } from 'react';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

 const handleSend = () => {
  if (input.trim() === '') return;

  const userMessage = { text: input, sender: 'user' };
  let botText = "Sorry, I don't understand that.";

  const lowerInput = input.toLowerCase();

  if (lowerInput.includes("heatstroke")) {
    botText = "Heatstroke is a serious condition caused by overheating. Stay hydrated and avoid outdoor activity in high temperatures.";
  } else if (lowerInput.includes("hydration") || lowerInput.includes("water")) {
    botText = "Drink at least 2-3 liters of water daily. During hot weather or activity, increase your fluid intake.";
  } else if (lowerInput.includes("symptoms")) {
    botText = "Symptoms of heatstroke include dizziness, headache, nausea, dry skin, and confusion.";
  } else if (lowerInput.includes("food")) {
    botText = "Eat hydrating foods like watermelon, cucumber, oranges, and drink coconut water.";
  } else if (lowerInput.includes("prevent") || lowerInput.includes("precaution")) {
    botText = "Wear light clothing, avoid going out in the afternoon sun, and keep drinking water regularly.";
  } else if (lowerInput.includes("help") || lowerInput.includes("emergency")) {
    botText = "In case of emergency, move to a cool place, give water, and call for medical help immediately.";
  }

  const botMessage = { text: botText, sender: 'bot' };

  setMessages([...messages, userMessage, botMessage]);
  setInput('');
};

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-4 bg-white border border-gray-200">
      <div className="h-64 overflow-y-auto mb-4 bg-gray-50 p-2 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg max-w-[80%] ${
              msg.sender === 'user' ? 'ml-auto bg-blue-100 text-right' : 'mr-auto bg-gray-200 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;