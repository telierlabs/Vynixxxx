
import React from 'react';
import { Settings, Shield, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

interface ProfileViewProps {
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  const sections = [
    { title: 'Account Settings', icon: Settings, items: ['Personal Info', 'Billing History', 'Connected Devices'] },
    { title: 'Security', icon: Shield, items: ['Change Password', 'Two-Factor Auth', 'Login Activity'] },
    { title: 'Preferences', icon: Bell, items: ['Notifications', 'Playback Quality', 'Download Options'] },
    { title: 'Support', icon: HelpCircle, items: ['Help Center', 'Contact Curator', 'Feedback'] },
  ];

  return (
    <div className="p-8 md:p-20 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-end space-y-8 md:space-y-0 md:space-x-12 mb-20">
        <div className="relative group">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-zinc-900 border-2 border-white/10 overflow-hidden relative shadow-2xl">
            <img src="https://picsum.photos/seed/profile/400" className="w-full h-full object-cover noir-image" alt="Profile" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Edit Avatar</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white text-black p-3 rounded-full shadow-xl">
             <Settings size={20} />
          </div>
        </div>
        
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row items-center md:items-baseline md:space-x-4 mb-2">
            <h1 className="text-4xl font-black uppercase tracking-tighter">Ethan Noir</h1>
            <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded font-bold tracking-widest">PREMIUM</span>
          </div>
          <p className="text-zinc-500 font-mono text-sm tracking-widest mb-6">MEMBER SINCE 2023 • ethanoir@platform.com</p>
          <div className="flex space-x-8 justify-center md:justify-start">
            <div className="text-center">
              <div className="text-2xl font-bold">124</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Watched</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Favs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {sections.map(sec => (
          <div key={sec.title} className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <sec.icon size={18} className="text-zinc-500" />
              <h3 className="text-xs font-bold uppercase tracking-[0.3em]">{sec.title}</h3>
            </div>
            <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden">
              {sec.items.map((item, idx) => (
                <button 
                  key={item} 
                  className={`w-full flex justify-between items-center px-8 py-5 text-sm uppercase tracking-widest hover:bg-white/5 transition-colors ${idx !== sec.items.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <span className="text-zinc-400">{item}</span>
                  <ChevronRight size={14} className="text-zinc-700" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-12 border-t border-white/10 flex justify-center">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-3 text-zinc-500 hover:text-white transition-all uppercase tracking-[0.4em] text-xs font-bold"
        >
          <LogOut size={16} />
          <span>Exit Application</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
