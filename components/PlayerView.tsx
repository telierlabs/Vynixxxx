import React from 'react';
import { ChevronLeft, Share2, Plus, ThumbsUp, ThumbsDown, MoreHorizontal } from 'lucide-react';
import { Movie } from '../types';

interface PlayerViewProps {
  movie: Movie;
  onBack: () => void;
  relatedMovies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const PlayerView: React.FC<PlayerViewProps> = ({ movie, onBack, relatedMovies, onSelectMovie }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 bg-black min-h-screen">
      {/* Main Content (Player & Info) */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="relative aspect-video w-full bg-zinc-900 rounded-xl overflow-hidden mb-4 border border-white/5">
          <video 
            src={movie.videoUrl} 
            controls 
            autoPlay
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Back Button Overlay */}
          <button 
            onClick={onBack}
            className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-xl rounded-full hover:bg-white hover:text-black transition-all z-10"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Info Area */}
        <div className="space-y-4">
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none">{movie.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
               <div className="flex items-center space-x-2 bg-zinc-900 px-3 py-1.5 rounded-full border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-black">V</div>
                  <span className="text-[11px] font-bold uppercase tracking-widest">Vynix Original</span>
               </div>
               <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest hover:opacity-90">Subscribe</button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-zinc-900 rounded-full border border-white/5 overflow-hidden">
                <button className="px-4 py-2 hover:bg-white/10 flex items-center space-x-2 border-r border-white/5">
                  <ThumbsUp size={16} />
                  <span className="text-xs font-bold">12K</span>
                </button>
                <button className="px-4 py-2 hover:bg-white/10">
                  <ThumbsDown size={16} />
                </button>
              </div>
              <button className="p-2 bg-zinc-900 rounded-full border border-white/5 hover:bg-white/10"><Share2 size={16} /></button>
              <button className="p-2 bg-zinc-900 rounded-full border border-white/5 hover:bg-white/10"><Plus size={16} /></button>
              <button className="p-2 bg-zinc-900 rounded-full border border-white/5 hover:bg-white/10"><MoreHorizontal size={16} /></button>
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest mb-2">
               <span className="text-white">1.2M views</span>
               <span className="text-zinc-500">•</span>
               <span className="text-white">{movie.year}</span>
               <span className="text-zinc-500">•</span>
               <span className="text-zinc-500">{movie.category}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              {movie.description || "In a world of refined vision, every frame in Vynix is a testament to cinematic excellence. This masterpiece explores the psychological depth of silence and the visual impact of high-contrast storytelling. Witness the revolution of the Vynix gaze."}
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar Suggestions */}
      <div className="w-full lg:w-80 space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-2">Up Next</h3>
        {relatedMovies.map((m) => (
          <div 
            key={m.id} 
            onClick={() => onSelectMovie(m)}
            className="flex gap-3 group cursor-pointer"
          >
            <div className="relative w-36 aspect-video shrink-0 bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
              <img src={m.imageUrl || m.posterUrl} alt={m.title} className="w-full h-full object-cover noir-image group-hover:scale-105 transition-transform" />
              <span className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[8px] font-bold">HD</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[11px] font-black uppercase tracking-tight line-clamp-2 group-hover:text-white transition-colors">{m.title}</h4>
              <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest mt-1">{m.category}</p>
              <p className="text-[9px] text-zinc-600 font-medium mt-0.5">{m.rating} Rating • {m.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerView;
