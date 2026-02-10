
import React from 'react';

interface LegalViewProps {
  type: 'about' | 'privacy';
}

const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  const content = {
    about: {
      title: 'Our Vision',
      subtitle: 'The Pursuit of Cinematic Purity',
      text: [
        'Founded in 2024, Vynix was born from a singular obsession: the timeless beauty of high-contrast and monochrome cinema. In an era of neon saturation, we believe that stripping away excess reveals the soul of storytelling—the play of light, the depth of shadow, and the raw emotion of the human face.',
        'We aren\'t just a streaming service; we are curators of an atmosphere. Every film in our collection is hand-selected for its contribution to the Vynix aesthetic. From the gritty noirs of the 1940s to modern artistic explorations, we provide a home for the sophisticated viewer.',
        'Our platform utilizes state-of-the-art AI to ensure that even legacy titles are presented with unparalleled clarity, preserving the grain and texture that makes film feel alive.'
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Your Data, Encrypted in Shadow',
      text: [
        'At Vynix, your privacy is paramount. We collect minimal data necessary to personalize your cinematic experience. Your watch history, AI assistant interactions, and payment information are protected by industry-leading encryption.',
        'We do not sell your data to third-party advertisers. Our revenue is derived solely from our premium membership community, ensuring our interests remain aligned with your privacy.',
        'By using Vynix, you agree to our sophisticated approach to data management. We use cookies to remember your aesthetic preferences and ensure seamless playback across your devices.'
      ]
    }
  };

  const active = content[type];

  return (
    <div className="p-8 md:p-24 max-w-4xl mx-auto">
      <div className="mb-20">
        <p className="text-zinc-600 uppercase tracking-[0.5em] text-[10px] mb-4">LEGAL DOCUMENTATION</p>
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">{active.title}</h1>
        <p className="text-lg text-zinc-400 font-light italic">{active.subtitle}</p>
      </div>

      <div className="space-y-12">
        {active.text.map((p, i) => (
          <p key={i} className="text-xl text-zinc-300 leading-relaxed font-light">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-20 pt-12 border-t border-white/10">
        <div className="flex items-center space-x-4">
            <div className="w-12 h-1 px-1 bg-white rounded-full"></div>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">Last Revision: Oct 2024</p>
        </div>
      </div>
    </div>
  );
};

export default LegalView;
