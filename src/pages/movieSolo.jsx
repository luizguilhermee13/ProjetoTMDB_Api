import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function MovieSelected() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  useEffect(() => {
    function filmeSelecionado() {
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, options)
        .then((res) => res.json())
        .then((res) => {
          setFilme(res);
        })
        .catch((err) => console.error(err));
    }

    filmeSelecionado();
  }, [id]);

  return (
    // Removido o 'absolute' e largura fixa, usando w-full e min-h-full para preencher perfeitamente sem quebrar
    <div className="w-full min-h-[calc(100vh-2rem)] bg-gradient-to-b from-[#032541] via-[#0d253f] to-[#01b4e4] text-white rounded-2xl p-4 sm:p-8 font-mono shadow-2xl relative overflow-x-hidden flex flex-col">
      {/* Container de Fundo com Backdrop se disponível */}
      {filme.backdrop_path && (
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center rounded-2xl pointer-events-none"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})` }}
        />
      )}

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 max-w-7xl mx-auto my-auto w-full">
        {/* Pôster do Filme */}
        <div className="flex-shrink-0">
          <img
            src={
              filme.poster_path
                ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
                : "https://via.placeholder.com/500x750?text=Sem+Imagem"
            }
            alt={filme.title}
            className="rounded-2xl w-64 sm:w-80 shadow-2xl border border-[#01b4e4]/30 object-cover"
          />
        </div>

        {/* Informações Detalhadas */}
        <div className="flex flex-col gap-4 text-center lg:text-left flex-1">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-wide text-white drop-shadow-md">{filme.title}</h1>

          {filme.tagline && <p className="text-blue-200 italic text-sm sm:text-base">"{filme.tagline}"</p>}

          {/* Detalhes extras (Gêneros, Nota, Duração, Lançamento) */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 my-2 text-xs sm:text-sm">
            {filme.genres &&
              filme.genres.map((g) => (
                <span key={g.id} className="bg-[#01b4e4]/20 border border-[#01b4e4] px-3 py-1 rounded-full text-blue-100">
                  {g.name}
                </span>
              ))}
            {filme.runtime && <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10">⏱️ {filme.runtime} min</span>}
            {filme.vote_average && (
              <span className="bg-[#90cea1]/20 border border-[#90cea1] text-[#90cea1] px-3 py-1 rounded-full font-bold">
                ⭐ {filme.vote_average.toFixed(1)} / 10
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-blue-200">Sinopse</h3>
            <p className="text-sm sm:text-base leading-relaxed text-gray-200">{filme.overview || "Sinopse não disponível em português."}</p>
          </div>

          <div className="pt-2 text-sm space-y-1 text-blue-100">
            <p>
              📅 <strong className="text-white">Lançamento:</strong> {filme.release_date || "Data não informada"}
            </p>
            {filme.homepage && (
              <p>
                🌐 <strong className="text-white">Onde acessar:</strong>{" "}
                <a href={filme.homepage} target="_blank" rel="noopener noreferrer" className="text-[#01b4e4] hover:underline break-all">
                  {filme.homepage}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
