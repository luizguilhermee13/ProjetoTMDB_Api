import CarouselSize from "@/components/ui/componentCarousel";
import { useState, useEffect } from "react";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function CategotyPage() {
  const [genero, setGenero] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  useEffect(() => {
    function chamandoApi() {
      fetch("https://api.themoviedb.org/3/genre/movie/list?language=pt-BR", options)
        .then((res) => res.json())
        .then((res) => {
          setGenero(res.genres || []);
        })
        .catch((err) => console.error(err));
    }

    chamandoApi();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[77.5rem] h-auto my-2 bg-gradient-to-t from-blue-800 to-blue-400 text-white rounded-2xl p-4 mx-auto">
      <div className="w-full">
        <div className="w-full text-center my-4">
          <h1 className="font-mono text-3xl sm:text-5xl font-bold tracking-wide">Gêneros de Filmes</h1>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-6 my-2 text-black">
          {genero.map((item) => (
            <CarouselSize key={item.id} genero={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
