import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function CategoriaSelecionada() {
  const { id } = useParams();
  const [filmesCategoria, setFilmesCategoria] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  useEffect(() => {
    function buscarFilmesPorCategoria() {
      fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=pt-BR`, options)
        .then((res) => res.json())
        .then((res) => {
          setFilmesCategoria(res.results || []);
        })
        .catch((err) => console.error(err));
    }

    buscarFilmesPorCategoria();
  }, [id]);

  return (
    <div className="flex flex-col items-center w-full max-w-full min-h-screen my-2 bg-gradient-to-t from-blue-800 to-blue-400 text-white rounded-2xl p-4 sm:p-6 overflow-x-hidden box-border">
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Cabeçalho e Botão de Voltar */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Link
            to="/dashboard/categories"
            className="bg-red-800 hover:bg-red-600 px-5 py-2 rounded-xl font-mono text-sm shadow-lg transition-colors"
          >
            ← Voltar às Categorias
          </Link>
          <h1 className="font-mono text-2xl sm:text-4xl font-bold tracking-wide text-center">Filmes da Categoria</h1>
          <div className="w-24 hidden sm:block"></div> {/* Espaçador para centralizar o título */}
        </div>

        {/* Grade de Filmes */}
        <div className="w-full">
          {filmesCategoria.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {filmesCategoria.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/dashboard/movies/${movie.id}`}
                  className="flex flex-col bg-red-900 border border-white/10 rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-105"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=Sem+Imagem"
                    }
                    alt={movie.title}
                    className="w-full h-64 sm:h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="p-3 bg-gradient-to-t from-black/95 to-black/60 flex-1 flex items-center justify-center">
                    <p className="text-white text-xs sm:text-sm font-mono font-bold line-clamp-2 text-center">{movie.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-xl font-mono animate-pulse">Carregando filmes...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
