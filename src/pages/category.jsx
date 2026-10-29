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
    // Busca a lista de gêneros
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=pt-BR", options)
      .then((res) => res.json())
      .then((res) => setGenero(res.genres || []))
      .catch((err) => console.error(err));

    // Busca os filmes em alta para o destaque do topo
    fetch("https://api.themoviedb.org/3/trending/movie/day?language=pt-BR", options)
      .then((res) => res.json())
      .then((res) => setTrendingMovies(res.results || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen my-2 bg-gradient-to-t from-blue-800 to-blue-400 text-white rounded-2xl p-2 sm:p-4 overflow-hidden">
      <div className="w-full">
        <div className="w-full text-center my-4">
          <h1 className="font-mono text-3xl sm:text-5xl font-bold tracking-wide">Gêneros e Destaques</h1>
        </div>

        {/* Destaques em Alta no Topo */}
        <div className="w-full mb-6">
          <h2 className="text-xl font-mono px-6 mb-2 text-blue-200">Em Alta</h2>
          <ImageAutoSlider movies={trendingMovies} />
        </div>

        {/* Lista de todos os Gêneros */}
        <div className="w-full flex flex-col gap-4 my-2">
          {genero.map((item) => (
            <GenreAutoSlider key={item.id} genre={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
