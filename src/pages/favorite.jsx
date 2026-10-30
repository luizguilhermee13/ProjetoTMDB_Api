import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function FavoritePage() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    // Carrega os filmes salvos no localStorage (ajuste a chave caso utilize outra no seu projeto, ex: "favorites" ou "tmdb_favoritos")
    const carregarFavoritos = () => {
      const salvos = JSON.parse(localStorage.getItem("favoritos")) || [];
      setFavoritos(salvos);
    };

    carregarFavoritos();
  }, []);

  return (
    // Padrão visual TMDB, sem quebras e preenchendo a tela de forma fluida
    <div className="w-full min-h-[calc(100vh-2rem)] bg-gradient-to-b from-[#032541] via-[#0d253f] to-[#01b4e4] text-white rounded-2xl p-4 sm:p-8 font-mono shadow-2xl flex flex-col items-center justify-between overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center flex-1 gap-8 my-auto">
        {/* Título */}
        <div className="flex items-center gap-3 text-center">
          <Heart className="text-[#01b4e4] fill-[#01b4e4]" size={36} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-md">Meus Filmes Favoritos</h1>
        </div>

        {/* Grade de Favoritos ou Mensagem de Vazio */}
        {favoritos.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-4 w-full my-4">
            {favoritos.map((filme) => (
              <Link
                key={filme.id}
                to={`/dashboard/movies/${filme.id}`}
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
                  <div className="w-full aspect-[2/3] bg-[#032541] flex items-center justify-center rounded-lg text-xs text-blue-200">
                    Sem imagem
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <p className="text-xl text-blue-200">Você ainda não adicionou nenhum filme aos favoritos.</p>
            <Link
              to="/dashboard/category"
              className="bg-[#01b4e4] hover:bg-[#0092bc] text-[#032541] px-6 py-3 rounded-xl font-semibold shadow-lg transition-colors"
            >
              Explorar Categorias
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
