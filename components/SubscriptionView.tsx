
import React from 'react';
import { Check } from 'lucide-react';

const SubscriptionView: React.FC = () => {
  const plans = [
    { name: 'Essence', price: 'Free', features: ['Standard HD', 'Ad Supported', 'Limited Library'], current: false },
    { name: 'Premium', price: '$12', features: ['4K Monochrome', 'Noir Originals', 'AI Assistant Pro', 'Ad Free'], current: true, featured: true },
    { name: 'Cinephile', price: '$22', features: ['Lossless Audio', 'Director Commentary', 'Early Screening', 'Family Plan'], current: false }
  ];

  return (
    <div className="p-8 md:p-16 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3">Tiers of Vision</h1>
        <p className="text-zinc-600 uppercase tracking-[0.4em] text-[10px] font-bold max-w-md mx-auto">
          Purity in every pixel. Choose your path.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative p-8 rounded-[2rem] border transition-all duration-500 flex flex-col ${plan.featured ? 'bg-white text-black border-white shadow-2xl md:scale-105 z-10' : 'bg-zinc-950 border-white/5 hover:border-white/20 text-white'}`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase border border-white/20">
                Recommended
              </div>
            )}
            
            <div className="mb-8">
              <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] mb-1 ${plan.featured ? 'text-zinc-500' : 'text-zinc-600'}`}>{plan.name}</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-black tracking-tighter">{plan.price}</span>
                {plan.price !== 'Free' && <span className="text-[10px] uppercase tracking-widest ml-1">/mo</span>}
              </div>
            </div>

            <ul className="space-y-4 flex-1 mb-8">
              {plan.features.map(feat => (
                <li key={feat} className="flex items-center space-x-2.5 text-[11px] uppercase tracking-tight font-bold">
                  <Check size={14} className={plan.featured ? 'text-zinc-400' : 'text-zinc-700'} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${plan.featured ? 'bg-black text-white hover:opacity-90' : 'bg-white text-black hover:scale-[1.02]'}`}>
              {plan.current ? 'Your Current Tier' : 'Upgrade Vision'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionView;
