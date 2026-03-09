import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Movie } from '../types';

export default function MovieCard({ movie }: { movie: Movie }) {
  const year = movie.release_date ? movie.release_date.substring(0,4) : '';
  
  return (
    <Link to={`/movie/${movie.id}`} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-white/5 bg-gray-900 block aspect-[2/3] transform-gpu">
      {movie.poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-500 bg-white/5">Brak plakatu</div>
      )}
      
      {/* Overlay: upewniamy się, że zawsze jest w granicach (rounded-2xl rodzica tnie nadmiar) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-10 pointer-events-none">
        <h3 className="font-bold text-lg text-white mb-1 leading-tight drop-shadow-md">
          {movie.title} <span className="text-purple-400 font-medium">({year})</span>
        </h3>
        <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-sm mb-3">
          <Star size={14} fill="currentColor" /> {movie.vote_average?.toFixed(1)}
        </div>
        <p className="text-gray-300 text-xs line-clamp-4 leading-relaxed drop-shadow-sm">{movie.overview || 'Brak opisu.'}</p>
      </div>
    </Link>
  );
}
