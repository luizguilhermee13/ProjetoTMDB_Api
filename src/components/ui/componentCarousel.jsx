import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselSize({ genero }) {
  const { id } = useParams(); //  pega o id da URL
  const [filmeCategoria, setFilmeCategoria] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2Q0NjFiNTQzY2Q3Yzk0ZjgyNDA0MmJlZjRjMDljMSIsIm5iZiI6MTc0OTc1MTg2Ni44NDUsInN1YiI6IjY4NGIxODNhM2E4YjIyOWM1N2JiNDI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qmaXeBBcbDm3YagAJ-2AH9SKJ5u1n5_PyoNHXqXBRmw",
    },
  };

  useEffect(() => {
    function imageFilmeCategoria() {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genero.id}&language=pt-BR`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          setFilmeCategoria(res.results);
        })

        .catch((err) => console.error(err));
    }

    imageFilmeCategoria();
  }, [genero.id]);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[800px]"
    >
      <CarouselContent>
        {filmeCategoria.slice(0, 10).map((filme, index) => (
          <CarouselItem
            key={filme.id || index}
            className="md:basis-1/3 lg:basis-1/4 "
          >
            <div className="font-mono">
              <Card className="w-[180px] h-[240px]  bg-red-600 hover:bg-red-700 shadow-lg text-white border-none">
                <CardContent className="flex aspect-square items-center justify-center p-1  ">
                  <div className="  w-full h-[200px] ">
                    <Link to={`/dashboard/categories/${genero.id}`}>
                      <h2 className="flex justify-center m-0 text-2xl font-semibold mb-1">
                        {genero.name}
                      </h2>
                      {filme.backdrop_path ? (
                        <img
                          className="h-full w-full rounded-xl bg-cover pb-1"
                          src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`}
                          alt={filme.original_title}
                        />
                      ) : (
                        <div className="w-full h-20 bg-gray-200 flex items-center justify-center">
                          Sem imagem
                        </div>
                      )}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

/*
    <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="w-[180px] h-[240px]">
                <CardContent className="flex aspect-square items-center justify-center p-1">
                  <div
                    key={index}
                    className="text-2xl font-semibold w-full h-full "
                  >
                    <Link to={`/CategoriaSelecionada/${genero.id}`}>
                      <h2 className="flex justify-center m-0">{genero.name}</h2>
                      <img
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500${filmeCategoria.backdrop_path}`}
                        alt={filmeCategoria.original_title}
                      />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
*/
