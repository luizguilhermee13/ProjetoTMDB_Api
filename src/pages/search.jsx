import { useState } from "react";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function SearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const [filmes, setFilmes] = useState([]);

  const inputValue = (event) => setSearchInput(event.target.value);

  function Pesquisando(event) {
    event.preventDefault();

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=pt-br&page=1`, options)
      .then((res) => res.json())
      .then((res) => setFilmes(res.results || []))
      .catch((err) => console.error(err));
  }

  return (
    <div className={`bg-gradient-to-t from-blue-800 to-blue-400 w-full text-white flex flex-col rounded-2xl p-2 sm:p-4`}>
      <div className={`w-full max-h-fit border shadow-zinc-800 shadow-md rounded-2xl p-4 bg-transparent`}>
        <form onSubmit={Pesquisando} className={`w-full flex flex-col items-center justify-center gap-6 p-2`}>
          {/* Título responsivo: escalonado de 3xl no mobile até 6xl em telas maiores */}
          <div className="w-full text-center">
            <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-wide text-center">
              Pesquisa de Filmes
            </h1>
          </div>

          {/* Wrapper com max-w-xl para evitar estouro do input no mobile */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xl mb-2">
            <input
              className="w-full rounded-xl py-3 px-4 text-xl sm:text-2xl text-black shadow-inner outline-none focus:ring-2 focus:ring-blue-300"
              type="text"
              placeholder="Procure o filme"
              value={searchInput}
              onChange={inputValue}
            />
            <button
              className="w-full sm:w-auto bg-red-800 py-3 px-8 rounded-xl shadow-lg hover:bg-red-600 text-xl sm:text-2xl font-semibold transition-colors"
              onClick={Pesquisando}
            >
              Pesquisar
            </button>
          </div>
        </form>

        {/* Grade fluida otimizada para todas as resoluções */}
        <div className={`grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] my-4 gap-4`}>
          {filmes.map((filme, index) => (
            <ExibindoPesquisa key={index} filme={filme} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExibindoPesquisa({ filme }) {
  return (
    <div className="flex flex-col w-full items-center justify-between gap-2 p-3 bg-red-600 hover:bg-red-700 shadow-md shadow-black rounded-xl font-mono text-sm sm:text-base text-center transition-transform hover:scale-[1.02]">
      <h2 className="font-bold line-clamp-1 w-full" title={filme.title}>
        {filme.title}
      </h2>

      {filme.poster_path ? (
        <img
          className="w-full aspect-[2/3] object-cover rounded-lg shadow"
          src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
          alt={filme.title}
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-red-800 flex items-center justify-center rounded-lg text-xs">Sem imagem</div>
      )}
    </div>
  );
}
