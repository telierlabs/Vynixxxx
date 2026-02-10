import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  CreditCard, 
  Bot, 
  Newspaper, 
  Menu, 
  X,
  Sparkles,
  LogOut,
  Bell
} from 'lucide-react';
import { Page, Movie } from './types';
import HomeView from './components/HomeView';
import NewsView from './components/NewsView';
import AssistantView from './components/AssistantView';
import EditorView from './components/EditorView';
import Footer from './components/Footer';
import AuthView from './components/AuthView';
import SubscriptionView from './components/SubscriptionView';
import ProfileView from './components/ProfileView';
import LegalView from './components/LegalView';
import PlayerView from './components/PlayerView';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [heroData, setHeroData] = useState<any>(null);

  // Load movies and hero data from JSON
  useEffect(() => {
    // Load movies
    fetch('/data/movies.json')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Failed to load movies:', err));

    // Load hero data
    fetch('/data/hero.json')
      .then(res => res.json())
      .then(data => setHeroData(data))
      .catch(err => console.error('Failed to load hero:', err));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const playMovie = (movie: Movie) => {
    setActiveMovie(movie);
    setCurrentPage('player');
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'news', icon: Newspaper, label: 'Cinema News' },
    { id: 'ai-assistant', icon: Bot, label: 'AI Assistant' },
    { id: 'fav', icon: Heart, label: 'My Favorites' },
    { id: 'editor', icon: Sparkles, label: 'Visual Lab' },
  ];

  const renderContent = () => {
    if (!isLoggedIn && currentPage !== 'login' && currentPage !== 'about' && currentPage !== 'privacy') {
        return <AuthView onLogin={() => { setIsLoggedIn(true); setCurrentPage('home'); }} />;
    }

    if (currentPage === 'player' && activeMovie) {
        return (
          <PlayerView 
            movie={activeMovie} 
            onBack={() => setCurrentPage('home')} 
            relatedMovies={movies.filter(m => m.id !== activeMovie.id)}
            onSelectMovie={playMovie}
          />
        );
    }

    switch (currentPage) {
      case 'home':
        return <HomeView 
          onNavigate={setCurrentPage} 
          onToggleFavorite={toggleFavorite} 
          onPlayMovie={playMovie} 
          favorites={favorites}
          movies={movies}
          heroData={heroData}
        />;
      case 'news':
        return <NewsView />;
      case 'ai-assistant':
        return <AssistantView />;
      case 'editor':
        return <EditorView />;
      case 'subscription':
        return <SubscriptionView />;
      case 'profile':
        return <ProfileView onLogout={() => { setIsLoggedIn(false); setCurrentPage('login'); }} />;
      case 'about':
        return <LegalView type="about" />;
      case 'privacy':
        return <LegalView type="privacy" />;
      default:
        return <HomeView 
          onNavigate={setCurrentPage} 
          onToggleFavorite={toggleFavorite} 
          onPlayMovie={playMovie} 
          favorites={favorites}
          movies={movies}
          heroData={heroData}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans selection:bg-white selection:text-black">
      {/* Sidebar - Ultra Minimal */}
      <nav className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-white/5 transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${currentPage === 'player' ? 'md:hidden' : ''}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8 hidden md:block px-4">
            <h1 className="text-2xl font-black tracking-tighter cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setCurrentPage('home')}>VYNIX</h1>
          </div>
          
          <div className="flex-1 space-y-1">
            <p className="px-4 text-[9px] text-zinc-700 uppercase tracking-[0.3em] font-black mb-4">Menu</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as Page);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                  currentPage === item.id 
                    ? 'bg-white text-black font-bold' 
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={16} className={currentPage === item.id ? 'text-black' : ''} />
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold">{item.label}</span>
              </button>
            ))}

            <div className="pt-6 mt-6 border-t border-white/5 space-y-1">
                <button
                    onClick={() => { setCurrentPage('profile'); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all ${currentPage === 'profile' ? 'bg-white text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
                >
                    <User size={16} />
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold">Profile</span>
                </button>
                <button
                    onClick={() => { setCurrentPage('subscription'); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all ${currentPage === 'subscription' ? 'bg-white text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
                >
                    <CreditCard size={16} />
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold">Premium</span>
                </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 text-[8px] text-zinc-800 font-mono uppercase tracking-widest">
            &copy; 2024 VYNIX STUDIO
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-[#050505]">
        {/* Top Header */}
        {currentPage !== 'player' && (
          <header className="flex items-center justify-between px-6 md:px-10 py-4 sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 md:border-none">
              <h1 className="md:hidden text-xl font-black tracking-tighter">VYNIX</h1>
              <div className="relative group w-48 md:w-80">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <input 
                      type="text"
                      placeholder="Search films, actors..."
                      className="w-full bg-zinc-900/50 border border-white/5 rounded-full py-2 pl-10 pr-4 text-[11px] focus:outline-none focus:border-white/20 transition-all"
                  />
              </div>
              <div className="flex items-center space-x-4">
                  <button className="md:hidden" onClick={toggleSidebar}><Menu size={20} /></button>
                  <div 
                      onClick={() => setCurrentPage('profile')}
                      className="w-8 h-8 rounded-full border border-white/10 overflow-hidden cursor-pointer hidden md:block"
                  >
                      <img src="https://picsum.photos/seed/ethan/100" alt="Avatar" className="w-full h-full object-cover noir-image" />
                  </div>
              </div>
          </header>
        )}

        <div className="flex-1">
            {renderContent()}
        </div>
        {currentPage !== 'player' && <Footer onNavigate={setCurrentPage} />}
      </main>
    </div>
  );
};

export default App;
