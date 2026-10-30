import { useState, useEffect } from "react";
import { GenreAutoSlider } from "@/components/ui/GenreAutoSlider";
import { ImageAutoSlider } from "@/components/ui/ImageAutoSlider";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function CategotyPage() {
  const [genero, setGenero] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=pt-BR", options)
      .then((res) => res.json())
      .then((res) => setGenero(res.genres || []))
      .catch((err) => console.error(err));

    fetch("https://api.themoviedb.org/3/trending/movie/day?language=pt-BR", options)
      .then((res) => res.json())
      .then((res) => setTrendingMovies(res.results || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    // Cores oficiais do TMDB: gradiente do azul escuro profundo para o azul claro/tecnológico da marca
    <div className="w-full h-full min-h-[calc(100vh-2rem)] bg-gradient-to-b from-[#032541] via-[#0d253f] to-[#01b4e4] text-white rounded-2xl p-4 sm:p-6 overflow-x-hidden box-border flex flex-col shadow-2xl">
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1">
        {/* Título */}
        <div className="w-full text-center mb-6">
          <h1 className="font-mono text-3xl sm:text-4xl font-bold tracking-wide text-white drop-shadow-md">Gêneros e Destaques</h1>
        </div>

        {/* Destaques em Alta no Topo */}
        <div className="w-full mb-6 overflow-hidden">
          <h2 className="text-lg sm:text-xl font-mono px-2 mb-2 text-[#90cea1] font-semibold">Em Alta</h2>
          <ImageAutoSlider movies={trendingMovies} />
        </div>

        {/* Lista de todos os Gêneros */}
        <div className="w-full flex flex-col gap-6 overflow-hidden">
          {genero.map((item) => (
            <GenreAutoSlider key={item.id} genre={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
