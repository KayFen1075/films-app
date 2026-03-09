import { Link, useLocation } from 'react-router-dom';
import { Clapperboard, List as ListIcon } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-2xl font-black text-white tracking-wider">
          <Clapperboard className="text-purple-500" size={28} />
          <span>Films</span>
        </Link>
        <div className="flex gap-4">
          <Link to="/" className={`px-5 py-2.5 rounded-2xl font-semibold transition-all duration-300 ${location.pathname === '/' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
            Katalog
          </Link>
          <Link to="/lists" className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold transition-all duration-300 ${location.pathname === '/lists' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
            <ListIcon size={18} /> Moje Listy
          </Link>
        </div>
      </div>
    </nav>
  );
}
