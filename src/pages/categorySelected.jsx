import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircularGallery } from "@/components/ui/CircularGallery";

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

  // Transforma a resposta do TMDB para o formato esperado pelo CircularGallery
  const galleryItems = filmesCategoria.map((filme) => ({
    id: filme.id,
    common: filme.title,
    binomial: filme.release_date ? `Lançamento: ${filme.release_date.split("-")[0]}` : "Filme",
    photo: {
      url: filme.poster_path
        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        : "https://via.placeholder.com/500x750?text=Sem+Imagem",
      text: filme.title,
    },
  }));

  return (
    // Estendemos a altura (400vh) para que a rolagem da página gire a galeria circular
    <div className="w-full bg-gradient-to-t from-blue-800 to-blue-400 text-white min-h-screen relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center absolute top-6 z-10 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-wide drop-shadow-md">Filmes da Categoria</h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">Role a página para girar os filmes em 3D</p>
        </div>

        <div className="w-full h-full pt-16">
          {galleryItems.length > 0 ? (
            <CircularGallery items={galleryItems} radius={450} autoRotateSpeed={0.015} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl font-mono animate-pulse">Carregando filmes...</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-6 z-10">
          <Link
            to="/dashboard/category"
            className="bg-red-800 hover:bg-red-600 px-6 py-2.5 rounded-xl font-mono text-sm shadow-lg transition-colors"
          >
            Voltar às Categorias
          </Link>
        </div>
      </div>
    </div>
  );
}
