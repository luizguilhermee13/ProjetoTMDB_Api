import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function CategoriaSelecionada() {
  const { id } = useParams(); //  pega o id da URL
  const [teste, setTeste] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2Q0NjFiNTQzY2Q3Yzk0ZjgyNDA0MmJlZjRjMDljMSIsIm5iZiI6MTc0OTc1MTg2Ni44NDUsInN1YiI6IjY4NGIxODNhM2E4YjIyOWM1N2JiNDI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qmaXeBBcbDm3YagAJ-2AH9SKJ5u1n5_PyoNHXqXBRmw",
    },
  };

  useEffect(() => {
    function teste2() {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=pt-BR`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          setTeste(res.results);
        })

        .catch((err) => console.error(err));
    }

    teste2();
  }, [id]);

  return (
    <div
      className={`absolute w-full max-w-[77.5rem] h-auto  grid sm:grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 gap-2 my-2 p-2 bg-gradient-to-t from-blue-800 to-blue-400`}
    >
      {teste.map((teste, index) => (
        <div
          key={index}
          teste={teste}
          className="w-4/5 mx-auto h-full justify-center"
        >
          <Card className="w-[240px] h-[250px] bg-red-600 hover:bg-red-700 shadow-lg text-white text-center border-none m-2">
            <CardContent className="flex aspect-square items-center justify-center p-1  ">
              <div className="flex flex-col justify-center text-sm  w-full h-full ">
                <Link to={`/dashboard/movies/${teste.id}`}>
                  <h2 className="text-xl">{teste.title}</h2>
                  <img
                    className="h-40 w-full rounded-xl bg-cover pb-1"
                    src={`https://image.tmdb.org/t/p/w500${teste.backdrop_path}`}
                    alt={teste.original_title}
                  />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
