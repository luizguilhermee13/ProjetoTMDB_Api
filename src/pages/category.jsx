import CarouselSize from "@/components/ui/componentCarousel"; //trazendo o corousel do shadcn para o arquivo
import { useState } from "react";
import { useEffect } from "react";

export default function CategotyPage() {
  const [genero, setGenero] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2Q0NjFiNTQzY2Q3Yzk0ZjgyNDA0MmJlZjRjMDljMSIsIm5iZiI6MTc0OTc1MTg2Ni44NDUsInN1YiI6IjY4NGIxODNhM2E4YjIyOWM1N2JiNDI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qmaXeBBcbDm3YagAJ-2AH9SKJ5u1n5_PyoNHXqXBRmw",
    },
  };

  useEffect(() => {
    function chamandoApi() {
      fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=pt-br",
        options
      )
        .then((res) => res.json())
        .then((res) => {
          setGenero(res.genres);
        })

        .catch((err) => console.error(err));
    }

    chamandoApi();
  }, []);

  return (
    <div
      className={`absolute flex flex-col justify-center items-center w-full max-w-[77.5rem] h-auto   my-2
    bg-gradient-to-t  from-blue-800 to-blue-400 text-white`}
    >
      <div className="w-full">
        <div className="w-full flex justify-center">
          <h1>Generos</h1>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2 my-2 text-black">
          {genero.map((genero, index) => (
            <CarouselSize key={index} genero={genero}></CarouselSize>
          ))}
        </div>
      </div>
    </div>
  );
}
/*Endpoint usado
https://api.themoviedb.org/3/genre/movie/list

link
https://developer.themoviedb.org/reference/genre-movie-list
 */
