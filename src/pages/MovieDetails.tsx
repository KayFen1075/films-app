import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, ExternalLink, ArrowLeft } from 'lucide-react';
import { useLists } from '../hooks/useLocalStorage';

const API_KEY = '92b418e837b833be308bbfb1fb2aca1e';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const { favorites, watched, planned, onHold, toggleList } = useLists();

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pl-PL&append_to_response=videos,credits`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <div className="min-h-screen flex justify-center items-center"><div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div></div>;

  const trailer = movie.videos?.results?.find((v: any) => v.type === 'Trailer') || movie.videos?.results?.[0];
  const backdrop = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '';
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

  const checkList = (list: any[]) => list.some(m => m.id === movie.id);

  const listsButtons = [
    { id: 'watched', label: 'Obejrzane', activeClass: 'bg-green-500 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' },
    { id: 'planned', label: 'W planach', activeClass: 'bg-blue-500 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' },
    { id: 'onHold', label: 'Odłożone', activeClass: 'bg-orange-500 border-orange-400 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' },
    { id: 'favorites', label: 'Ulubione', activeClass: 'bg-pink-500 border-pink-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]' }
  ];

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="absolute inset-0 h-[80vh]">
        {backdrop && <img src={backdrop} alt="Background" className="w-full h-full object-cover opacity-30" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-[#0f0f13]/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 pt-32 px-6 max-w-[1400px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-2xl mb-10 transition-all border border-white/10 font-bold">
          <ArrowLeft size={18} /> Wróć
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="shrink-0 w-64 md:w-80 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 bg-black/50 mx-auto lg:mx-0">
            {poster ? <img src={poster} alt={movie.title} className="w-full h-auto" /> : <div className="aspect-[2/3] flex items-center justify-center text-gray-500">Brak plakatu</div>}
          </div>
          
          <div className="flex-1 mt-4 lg:mt-10 w-full">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
              {movie.title} <span className="text-purple-400 opacity-80 font-semibold text-3xl md:text-5xl">({movie.release_date?.substring(0,4)})</span>
            </h1>
            {movie.tagline && <p className="text-xl md:text-2xl text-purple-300 font-light italic mb-8 drop-shadow-lg">{movie.tagline}</p>}
            
            <div className="flex flex-wrap items-center gap-4 text-white font-semibold mb-10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10"><Calendar size={18} className="text-purple-400"/> {movie.release_date}</div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10"><Clock size={18} className="text-purple-400"/> {movie.runtime} min</div>
              <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-md px-4 py-2 rounded-xl border border-yellow-500/30 text-yellow-400"><Star size={18} className="fill-yellow-400"/> {movie.vote_average?.toFixed(1)}</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl mb-10">
              <h3 className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-4">Zarządzaj listami</h3>
              <div className="flex flex-wrap gap-3">
                {listsButtons.map(btn => {
                  let isActive = false;
                  if (btn.id === 'watched') isActive = checkList(watched);
                  if (btn.id === 'planned') isActive = checkList(planned);
                  if (btn.id === 'onHold') isActive = checkList(onHold);
                  if (btn.id === 'favorites') isActive = checkList(favorites);

                  return (
                    <button 
                      key={btn.id}
                      onClick={() => toggleList(btn.id, movie)}
                      className={`px-5 py-2.5 rounded-xl font-bold transition-all border ${isActive ? btn.activeClass : 'bg-black/40 border-white/10 text-gray-300 hover:bg-white/10'}`}
                    >
                      {btn.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-10 max-w-4xl">
              <h3 className="text-2xl font-bold text-white mb-4">Opis</h3>
              <p className="text-lg text-gray-300 leading-relaxed">{movie.overview || "Brak opisu dla tego filmu."}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl transition-all border border-white/10 backdrop-blur-md">
                Otwórz na TMDB <ExternalLink size={20} />
              </a>
            </div>

            {/* Embedded Trailer Native */}
            {trailer && (
              <div className="max-w-4xl mt-10">
                <h3 className="text-2xl font-bold text-white mb-6">Zwiastun</h3>
                <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/50">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailer.key}`} 
                    title="Trailer" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>

        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8">Obsada</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
              {movie.credits.cast.slice(0, 12).map((actor: any) => (
                <div key={actor.id} className="min-w-[140px] bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 p-2">
                  <div className="rounded-xl overflow-hidden aspect-[2/3] mb-3">
                    {actor.profile_path ? (
                      <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black/50 flex items-center justify-center text-gray-600">Brak zdjęcia</div>
                    )}
                  </div>
                  <div className="text-white font-bold text-sm leading-tight mb-1">{actor.name}</div>
                  <div className="text-xs text-gray-500 leading-tight">{actor.character}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
