
import React from 'react';

const MOCK_NEWS = [
  { id: '1', title: 'The Future of 8K Streaming', date: 'Oct 24, 2024', summary: 'How NoirStream is leading the charge in high-fidelity monochrome broadcasting technologies across the globe.', imageUrl: 'https://picsum.photos/seed/news1/600/400' },
  { id: '2', title: 'Oscar Predictions 2025', date: 'Oct 22, 2024', summary: 'Our critics weigh in on the likely contenders for this year\'s biggest cinematography awards.', imageUrl: 'https://picsum.photos/seed/news2/600/400' },
  { id: '3', title: 'Director\'s Cut: Exclusive', date: 'Oct 20, 2024', summary: 'An interview with the visionary mind behind "The Silent Void" on the challenges of black and white filming.', imageUrl: 'https://picsum.photos/seed/news3/600/400' },
];

const NewsView: React.FC = () => {
  return (
    <div className="p-8 md:p-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">News & Updates</h1>
          <p className="text-zinc-500 uppercase tracking-widest text-sm">Insights into the world of cinema</p>
        </div>
        <div className="mt-8 md:mt-0">
          <span className="text-xs border border-white/20 px-4 py-2 rounded-full font-mono">EDITION 10.24.2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Featured News */}
        <div className="lg:col-span-2 relative group cursor-pointer overflow-hidden rounded-[3rem]">
          <img src={MOCK_NEWS[0].imageUrl} className="w-full h-[500px] object-cover noir-image group-hover:scale-105 transition-transform duration-700" alt="News" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <span className="text-xs bg-white text-black px-3 py-1 rounded-full mb-4 inline-block font-bold">LATEST FEATURE</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">{MOCK_NEWS[0].title}</h2>
            <p className="text-zinc-300 text-lg max-w-xl mb-4 leading-relaxed">{MOCK_NEWS[0].summary}</p>
            <p className="text-zinc-500 font-mono text-sm">{MOCK_NEWS[0].date}</p>
          </div>
        </div>

        {/* List News */}
        {MOCK_NEWS.slice(1).map(news => (
          <div key={news.id} className="flex flex-col md:flex-row gap-8 items-center bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all group">
            <div className="w-full md:w-48 aspect-video rounded-2xl overflow-hidden shrink-0">
              <img src={news.imageUrl} className="w-full h-full object-cover noir-image group-hover:scale-110 transition-transform duration-500" alt="news" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-mono mb-2">{news.date}</p>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">{news.title}</h3>
              <p className="text-zinc-400 text-sm line-clamp-2">{news.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsView;
