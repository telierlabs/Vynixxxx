
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, UserPlus } from 'lucide-react';

interface AuthViewProps {
  onLogin: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-black">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center">
          <h1 className="text-6xl font-black tracking-tighter mb-4">VYNIX</h1>
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-xs">
            {isLoginMode ? 'Access your collection' : 'Begin your journey'}
          </p>
        </div>

        <div className="bg-zinc-950 border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[80px]" />
          
          <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            {!isLoginMode && (
               <div className="space-y-2">
                <label className="text-[10px] text-zinc-600 uppercase tracking-widest ml-4 font-bold">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"><UserPlus size={18}/></span>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white transition-all placeholder:text-zinc-800"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] text-zinc-600 uppercase tracking-widest ml-4 font-bold">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"><Mail size={18}/></span>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white transition-all placeholder:text-zinc-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-4">
                <label className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Password</label>
                {isLoginMode && <button type="button" className="text-[10px] text-zinc-500 hover:text-white transition-colors">FORGOT?</button>}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"><Lock size={18}/></span>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white transition-all placeholder:text-zinc-800"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:scale-[0.98] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span>{isLoginMode ? 'Login Now' : 'Create Account'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-12 text-center pt-8 border-t border-white/5">
            <button 
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-xs text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div>

        <div className="text-center opacity-30 text-[10px] font-mono tracking-widest uppercase">
          Secured by VynixVault Encryption
        </div>
      </div>
    </div>
  );
};

export default AuthView;
