
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black border-t border-white/5 p-12 md:p-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-3xl font-black tracking-tighter mb-6">VYNIX</h2>
          <p className="text-zinc-600 text-xs leading-relaxed uppercase tracking-[0.2em] font-bold">
            The world's leading streaming platform for high-contrast, artistic, and monochromatic vision.
          </p>
        </div>
        
        <div>
          <h3 className="text-[10px] text-zinc-700 uppercase tracking-[0.4em] mb-8 font-black">Archive</h3>
          <ul className="space-y-5">
            <li><button onClick={() => onNavigate('home')} className="text-zinc-500 hover:text-white text-[11px] uppercase tracking-widest font-bold transition-colors">Home Stage</button></li>
            <li><button onClick={() => onNavigate('news')} className="text-zinc-500 hover:text-white text-[11px] uppercase tracking-widest font-bold transition-colors">Journal</button></li>
            <li><button onClick={() => onNavigate('ai-assistant')} className="text-zinc-500 hover:text-white text-[11px] uppercase tracking-widest font-bold transition-colors">Vynix AI</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] text-zinc-700 uppercase tracking-[0.4em] mb-8 font-black">Studio</h3>
          <ul className="space-y-5">
            <li><button onClick={() => onNavigate('about')} className="text-zinc-500 hover:text-white text-[11px] uppercase tracking-widest font-bold transition-colors">Manifesto</button></li>
            <li><button onClick={() => onNavigate('privacy')} className="text-zinc-500 hover:text-white text-[11px] uppercase tracking-widest font-bold transition-colors">Privacy</button></li>
            <li><button className="text-zinc-500 hover:text-white text-[11px] uppercase tracking-widest font-bold transition-colors">Support</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] text-zinc-700 uppercase tracking-[0.4em] mb-8 font-black">Membership</h3>
          <p className="text-zinc-600 text-[10px] uppercase leading-loose tracking-widest mb-6">Join our community of visionaries for exclusive screenings.</p>
          <button 
            onClick={() => onNavigate('subscription')}
            className="w-full py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Upgrade Tier
          </button>
        </div>
      </div>
      
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] text-zinc-800 font-mono tracking-[0.3em] uppercase">
        <span>© 2024 VYNIX INTERACTIVE. ALL RIGHTS RESERVED.</span>
        <div className="flex space-x-8 mt-6 md:mt-0">
          <span className="hover:text-zinc-400 cursor-pointer">TWITTER</span>
          <span className="hover:text-zinc-400 cursor-pointer">INSTAGRAM</span>
          <span className="hover:text-zinc-400 cursor-pointer">VIMEO</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
