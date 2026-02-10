import React, { useState, useMemo } from 'react';
import { Play, Info, Heart, Star, ChevronRight } from 'lucide-react';
import { Movie, Page } from '../types';
import CategoryFilter from './CategoryFilter';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
  onToggleFavorite: (id: string) => void;
  onPlayMovie: (movie: Movie) => void;
  favorites: string[];
  movies: Movie[];
  heroData: any;
}

const MovieRow: React.FC<{ title: string; movies: Movie[]; onToggleFavorite: (id: string) => void; favorites: string[]; onPlayMovie: (movie: Movie) => void }> = ({ title, movies, onToggleFavorite, favorites, onPlayMovie }) => {
  if (movies.length === 0) return null;
  
  return (
    <section className="px-6 md:px-10 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center">
          {title}
          <ChevronRight size={14} className="ml-2 text-zinc-700" />
        </h2>
        <button className="text-[9px] text-zinc-600 hover:text-white transition-colors uppercase tracking-[0.3em] font-black">Browse</button>
      </div>
      <div className="flex space-x-4 md:space-x-5 overflow-x-auto no-scrollbar pb-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-none w-36 md:w-48 group">
            <div 
              onClick={() => onPlayMovie(movie)}
              className="relative aspect-[2/3] mb-3 rounded-xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-500 group-hover:scale-[1.03] group-hover:border-white/20 shadow-xl cursor-pointer"
            >
              <img 
                src={movie.imageUrl || movie.posterUrl} 
                alt={movie.title}
                className="w-full h-full object-cover noir-image"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite(movie.id); }}
                  className={`p-2.5 rounded-full border border-white/10 backdrop-blur-md transition-all ${favorites.includes(movie.id) ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
                >
                  <Heart size={14} fill={favorites.includes(movie.id) ? 'currentColor' : 'none'} />
                </button>
                <div className="p-2.5 bg-white text-black rounded-full hover:scale-110 transition-transform">
                  <Play size={14} fill="currentColor" />
                </div>
              </div>
              <div className="absolute top-2 left-2">
                  <span className="text-[8px] font-black px-1.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded uppercase tracking-tighter">{movie.rating}</span>
              </div>
            </div>
            <div className="px-1">
              <h3 className="text-[11px] font-black mb-0.5 line-clamp-1 group-hover:text-white transition-colors uppercase tracking-tight">{movie.title}</h3>
              <div className="flex items-center text-[9px] text-zinc-600 uppercase tracking-widest font-bold">
                  <span>{movie.category}</span>
                  <span className="mx-1 opacity-30">•</span>
                  <span>{movie.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const HomeView: React.FC<HomeViewProps> = ({ onToggleFavorite, favorites, onPlayMovie, movies, heroData }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Get unique categories from movies
  const categories = useMemo(() => {
    const cats = Array.from(new Set(movies.map(m => m.category)));
    return cats.sort();
  }, [movies]);

  // Filter movies by category
  const filteredMovies = useMemo(() => {
    if (activeCategory === 'All') return movies;
    return movies.filter(m => m.category === activeCategory);
  }, [movies, activeCategory]);

  const heroMovie = heroData ? {
    id: heroData.id,
    title: heroData.title,
    category: heroData.category,
    year: heroData.year,
    rating: heroData.rating,
    description: heroData.description,
    imageUrl: heroData.posterUrl,
    videoUrl: heroData.videoUrl
  } as Movie : null;

  return (
    <div className="pb-12">
      {/* Hero Banner */}
      {heroData && (
        <section className="relative h-[45vh] w-full overflow-hidden mb-8">
          <img 
            src={heroData.posterUrl} 
            alt={heroData.title}
            className="w-full h-full object-cover noir-image brightness-[0.4] scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-2xl z-10">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-2 py-0.5 border border-white/40 text-white text-[8px] font-black rounded uppercase tracking-widest">{heroData.badge || 'PREMIERE'}</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">{heroData.metascore || heroData.rating + ' Rating'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-none uppercase">{heroData.title}</h1>
            <p className="text-zinc-500 text-xs md:text-sm mb-6 leading-relaxed font-medium line-clamp-2 max-w-md italic">
              "{heroData.description}"
            </p>
            <div className="flex items-center gap-3">
              <button 
                  onClick={() => heroMovie && onPlayMovie(heroMovie)}
                  className="bg-white text-black px-6 py-2.5 rounded-lg flex items-center space-x-2 font-black text-[10px] hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Play size={14} fill="currentColor" />
                <span className="uppercase tracking-[0.2em]">Watch</span>
              </button>
              <button className="border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-2.5 rounded-lg flex items-center space-x-2 font-bold text-[10px] hover:bg-white/10 transition-colors">
                <Info size={14} />
                <span className="uppercase tracking-[0.2em]">Details</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <CategoryFilter 
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <div className="relative z-20 space-y-2">
        {/* Show filtered movies based on category */}
        {activeCategory === 'All' ? (
          <>
            <MovieRow 
              title="Trending" 
              movies={filteredMovies.filter(m => m.trending)} 
              onToggleFavorite={onToggleFavorite}
              favorites={favorites}
              onPlayMovie={onPlayMovie}
            />
            
            <MovieRow 
              title="New Arrivals" 
              movies={[...filteredMovies].reverse()} 
              onToggleFavorite={onToggleFavorite}
              favorites={favorites}
              onPlayMovie={onPlayMovie}
            />

            <MovieRow 
              title="All Films" 
              movies={filteredMovies} 
              onToggleFavorite={onToggleFavorite}
              favorites={favorites}
              onPlayMovie={onPlayMovie}
            />
          </>
        ) : (
          <MovieRow 
            title={activeCategory + ' Films'} 
            movies={filteredMovies} 
            onToggleFavorite={onToggleFavorite}
            favorites={favorites}
            onPlayMovie={onPlayMovie}
          />
        )}
      </div>
    </div>
  );
};

export default HomeView;
