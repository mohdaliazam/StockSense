'use client';

import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: "Hi! I'm your StockSense AI assistant. How can I help you analyze your inventory today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Mock AI responses for hackathon "wow" factor
    setTimeout(() => {
      let reply = "I can analyze your stock levels and movement history. Try asking about 'low stock' or specific items.";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('steel') || lower.includes('rods')) {
        reply = "You have 150 units of Steel Rods left across all locations. Based on a 20% increase in depletion this week, I predict a stockout in 4 days. Would you like me to draft a purchase order?";
      } else if (lower.includes('low stock') || lower.includes('running out')) {
        reply = "Currently, 'Steel Frames' and 'Office Chairs' are below the minimum threshold. Generating a restock report...";
      } else if (lower.includes('export') || lower.includes('report')) {
        reply = "You can download the full immutable ledger as a CSV from the Move History tab!";
      }

      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <Bot size={28} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50 transition-all origin-bottom-right flex flex-col overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <Bot size={20} />
            <span className="font-bold">StockSense AI</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-blue-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4 bg-gray-800">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-3 border-t border-gray-700 bg-gray-900 flex space-x-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your inventory..." 
            className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-sm"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
