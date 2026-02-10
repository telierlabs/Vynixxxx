
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

const AssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Vynix. I am your cinematic AI assistant. How can I help you discover your next masterpiece today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithAssistant(userMsg, []);
      setMessages(prev => [...prev, { role: 'model', text: response || 'No response.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'An error occurred in the Vynix neural network.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 md:p-10 bg-black">
      <div className="max-w-3xl mx-auto w-full flex flex-col h-[75vh] bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden">
        {/* Compact Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center space-x-3 bg-black/40 backdrop-blur-md">
          <div className="p-2 bg-white text-black rounded-lg">
            <Bot size={18} />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em]">Vynix AI</h2>
            <p className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">Status: Online</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] flex items-start space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-1.5 rounded-lg ${msg.role === 'user' ? 'bg-zinc-800' : 'bg-white text-black'}`}>
                  {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div className={`p-3.5 rounded-2xl text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-zinc-900 border border-white/5' : 'bg-zinc-800 text-zinc-100'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 px-4 py-2.5 rounded-2xl flex items-center space-x-2">
                <Loader2 className="animate-spin text-zinc-500" size={14} />
                <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">Thinking</span>
              </div>
            </div>
          )}
        </div>

        {/* Compact Input */}
        <div className="p-5 bg-black/40 border-t border-white/5">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Vynix AI..."
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-5 py-3.5 text-xs focus:outline-none focus:border-white/40 transition-colors placeholder:text-zinc-700"
            />
            <button 
              onClick={handleSend}
              className="absolute right-1.5 p-2.5 bg-white text-black rounded-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              disabled={isLoading}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantView;
