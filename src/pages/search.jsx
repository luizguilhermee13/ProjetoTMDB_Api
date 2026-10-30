import { useState } from "react";
import { Link } from "react-router-dom"; // Importado corretamente

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
    // Fundo com o gradiente oficial do TMDB e cantos arredondados consistentes
    <div className="bg-gradient-to-b from-[#032541] via-[#0d253f] to-[#01b4e4] w-full min-h-[calc(100vh-2rem)] text-white flex flex-col rounded-2xl p-4 sm:p-6 shadow-2xl overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1">
        <form onSubmit={Pesquisando} className="w-full flex flex-col items-center justify-center gap-6 p-2">
          <div className="w-full text-center">
            <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-wide text-white drop-shadow-md">
              Pesquisa de Filmes
            </h1>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-xl mb-2">
            <input
              className="w-full rounded-xl py-3 px-4 text-xl sm:text-2xl text-black bg-white shadow-inner outline-none focus:ring-2 focus:ring-[#01b4e4]"
              type="text"
              value={searchInput}
              onChange={inputValue}
              placeholder="Procure o filme"
            />
            <button
              className="w-full sm:w-auto bg-[#01b4e4] py-3 px-8 rounded-xl shadow-lg hover:bg-[#0092bc] text-xl sm:text-2xl font-semibold transition-colors text-[#032541]"
              type="submit"
            >
              Pesquisar
            </button>
          </div>
        </form>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] my-4 gap-4">
          {filmes.map((filme) => (
            <ExibindoPesquisa key={filme.id} filme={filme} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExibindoPesquisa({ filme }) {
  return (
    <Link
      to={`/dashboard/movies/${filme.id}`}
      // Substituído o vermelho por um card com tom escuro e borda/hover alinhados à identidade do TMDB
      className="flex flex-col w-full items-center justify-between gap-2 p-3 bg-[#0d253f] hover:bg-[#112d4e] border border-[#01b4e4]/30 shadow-md shadow-black/50 rounded-xl font-mono text-sm sm:text-base text-center transition-transform hover:scale-[1.02]"
    >
      <h2 className="font-bold line-clamp-1 w-full text-white" title={filme.title}>
        {filme.title}
      </h2>

      {filme.poster_path ? (
        <img
          className="w-full aspect-[2/3] object-cover rounded-lg shadow"
          src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
          alt={filme.title}
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-[#032541] flex items-center justify-center rounded-lg text-xs text-blue-200">Sem imagem</div>
      )}
    </Link>
  );
}
