import { useState } from 'react';
import { useLists } from '../hooks/useLocalStorage';
import MovieCard from '../components/MovieCard';

export default function Lists() {
  const [activeTab, setActiveTab] = useState('watched');
  const lists = useLists();

  const tabs = [
    { id: 'watched', label: 'Obejrzane' },
    { id: 'planned', label: 'W planach' },
    { id: 'onHold', label: 'Odłożone' },
    { id: 'favorites', label: 'Ulubione' }
  ];

  const currentList = lists[activeTab as keyof typeof lists] as any[];

  return (
    <div className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="flex justify-center mb-12">
        <div className="bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10 inline-flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {currentList.length === 0 ? (
        <div className="text-center py-32 text-gray-500 bg-white/5 backdrop-blur-md rounded-3xl border border-white/5">
          <p className="text-xl font-medium">Lista jest pusta</p>
          <p className="text-sm mt-2 opacity-60">Filmy dodane do tej sekcji pojawią się tutaj.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {currentList.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </div>
  );
}
