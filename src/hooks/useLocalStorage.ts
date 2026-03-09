import { useState, useEffect } from 'react';
import { Movie } from '../types';

export function useLists() {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [watched, setWatched] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('watched');
    return saved ? JSON.parse(saved) : [];
  });
  const [planned, setPlanned] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('planned');
    return saved ? JSON.parse(saved) : [];
  });
  const [onHold, setOnHold] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('onHold');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('watched', JSON.stringify(watched)), [watched]);
  useEffect(() => localStorage.setItem('planned', JSON.stringify(planned)), [planned]);
  useEffect(() => localStorage.setItem('onHold', JSON.stringify(onHold)), [onHold]);

  const toggleList = (listName: string, movie: Movie) => {
    const updateFn = (prev: Movie[]) => 
      prev.find(m => m.id === movie.id) ? prev.filter(m => m.id !== movie.id) : [...prev, movie];

    if (listName === 'favorites') setFavorites(updateFn);
    if (listName === 'watched') setWatched(updateFn);
    if (listName === 'planned') setPlanned(updateFn);
    if (listName === 'onHold') setOnHold(updateFn);
  };

  return { favorites, watched, planned, onHold, toggleList };
}
