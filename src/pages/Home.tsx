import { useState, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import MovieCard from "../components/MovieCard";

const API_KEY = "92b418e837b833be308bbfb1fb2aca1e";
const BASE_URL = "https://api.themoviedb.org/3";

const GENRES = [
  { id: "", name: "Wszystkie" },
  { id: "28", name: "Akcja" },
  { id: "12", name: "Przygodowy" },
  { id: "16", name: "Animacja" },
  { id: "35", name: "Komedia" },
  { id: "18", name: "Dramat" },
  { id: "14", name: "Fantasy" },
  { id: "27", name: "Horror" },
  { id: "878", name: "Sci-Fi" },
  { id: "53", name: "Thriller" },
];

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Najpopularniejsze" },
  { value: "vote_average.desc", label: "Najlepiej oceniane" },
  { value: "primary_release_date.desc", label: "Nowości" },
];

const TABS = [
  { id: "trending", label: "Trendy (Tydzień)" },
  { id: "popular", label: "Najpopularniejsze" },
  { id: "now_playing", label: "Teraz w Kinach" },
  { id: "top_rated", label: "Najlepiej oceniane" },
];

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [activeTab, setActiveTab] = useState("trending");
  const [showFilters, setShowFilters] = useState(false);
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [year, setYear] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let url = "";

      if (search) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pl-PL&query=${search}&page=${page}`;
      } else if (genre || year || sortBy !== "popularity.desc") {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pl-PL&page=${page}&sort_by=${sortBy}&with_genres=${genre}&primary_release_year=${year}`;
      } else {
        switch (activeTab) {
          case "trending":
            url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pl-PL&page=${page}`;
            break;
          case "popular":
            url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pl-PL&page=${page}`;
            break;
          case "now_playing":
            url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pl-PL&page=${page}`;
            break;
          case "top_rated":
            url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pl-PL&page=${page}`;
            break;
          default:
            url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pl-PL&page=${page}`;
        }
      }

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchMovies();
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {
    if (!search) fetchMovies();
  }, [activeTab, genre, sortBy, year, page]);

  return (
    <div className="pt-28 pb-20 px-6 max-w-[1400px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            size={22}
          />
          <input
            type="text"
            placeholder="Szukaj filmów..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-white placeholder-gray-500 shadow-lg backdrop-blur-xl text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all backdrop-blur-xl border ${showFilters ? "bg-purple-500 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]" : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"}`}
        >
          {showFilters ? <X size={20} /> : <Filter size={20} />}
          Filtry
        </button>
      </div>

      {showFilters && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8 shadow-2xl animate-fade-in">
          <div className="flex flex-wrap gap-6 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider ml-1">
                Gatunek
              </label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {GENRES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setGenre(g.id);
                      setPage(1);
                      setActiveTab("");
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${genre === g.id ? "bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "bg-black/40 text-gray-300 border-white/5 hover:bg-white/10"}`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 w-full md:w-auto mt-2 md:mt-0">
              <div className="flex-1 md:w-48">
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider ml-1">
                  Sortowanie
                </label>
                <select
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 outline-none focus:border-purple-500/50 text-white cursor-pointer backdrop-blur-md appearance-none"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                    setActiveTab("");
                  }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option
                      key={o.value}
                      value={o.value}
                      className="bg-gray-900"
                    >
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 md:w-32">
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider ml-1">
                  Rok
                </label>
                <input
                  type="number"
                  placeholder="Np. 2023"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 outline-none focus:border-purple-500/50 text-white placeholder-gray-600 backdrop-blur-md"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setPage(1);
                    setActiveTab("");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {!search && !genre && !year && sortBy === "popularity.desc" && (
        <div className="m-auto flex overflow-x-auto no-scrollbar gap-2 mb-8 bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setPage(1);
              }}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-32">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {movies.length === 0 && (
            <div className="text-center text-gray-500 py-32 text-xl bg-white/5 backdrop-blur-md rounded-3xl border border-white/5">
              Nie znaleziono filmów dla tych kryteriów.
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-16 bg-white/5 backdrop-blur-xl w-fit mx-auto px-6 py-3 rounded-2xl border border-white/10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-white font-bold text-lg">
                Strona {page} z {totalPages > 500 ? 500 : totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= 500 || page === totalPages}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
