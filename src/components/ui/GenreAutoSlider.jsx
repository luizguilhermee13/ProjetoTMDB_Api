import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const GenreAutoSlider = ({ genre }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    };

    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&language=pt-BR`, options)
      .then((res) => res.json())
      .then((res) => setMovies(res.results || []))
      .catch((err) => console.error(err));
  }, [genre.id]);

  if (movies.length === 0) return null;

  // Duplica os filmes para garantir o loop infinito perfeito
  const duplicatedMovies = [...movies, ...movies];

  return (
    <div className="w-full my-4">
      <style>{`
        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll-slow {
          animation: scroll-slow 50s linear infinite; /* 50s deixa bem devagar e suave */
        }

        .infinite-scroll-slow:hover {
          animation-play-state: paused; /* Pausa quando o mouse passa por cima */
        }

        .scroll-container-mask {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        .movie-card-hover {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .movie-card-hover:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>

      {/* Cabeçalho do Gênero com link para a visão 3D */}
      <div className="flex justify-between items-center px-6 mb-2">
        <h2 className="text-xl font-mono font-bold text-white drop-shadow">{genre.name}</h2>
        <Link
          to={`/dashboard/categories/${genre.id}`}
          className="text-xs font-mono text-blue-200 hover:text-white underline transition-colors"
        >
          Ver em Galeria 3D 🎬
        </Link>
      </div>

      {/* Slider Infinito Lento */}
      <div className="scroll-container-mask w-full overflow-hidden py-2">
        <div className="infinite-scroll-slow flex gap-4 w-max px-2">
          {duplicatedMovies.map((movie, index) => (
            <Link
              key={`${movie.id}-${index}`}
              to={`/dashboard/movies/${movie.id}`}
              className="movie-card-hover flex-shrink-0 w-36 h-52 sm:w-44 sm:h-64 rounded-xl overflow-hidden shadow-xl relative bg-red-800 border border-white/10 block"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=Sem+Imagem"
                }
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                <p className="text-white text-xs font-mono font-bold line-clamp-1 text-center">{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
