import { useParams } from "react-router-dom";
import { useState } from "react"; //hook
import { useEffect } from "react"; //hook

export default function MovieSelected() {
  const { id } = useParams(); //  pega o id da URL
  const [filme, setFilme] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2Q0NjFiNTQzY2Q3Yzk0ZjgyNDA0MmJlZjRjMDljMSIsIm5iZiI6MTc0OTc1MTg2Ni44NDUsInN1YiI6IjY4NGIxODNhM2E4YjIyOWM1N2JiNDI5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qmaXeBBcbDm3YagAJ-2AH9SKJ5u1n5_PyoNHXqXBRmw",
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
    <div
      className=" absolute bg-gradient-to-t from-blue-800 to-blue-400 text-white max-w-[77.5rem] w-full
    h-full   my-2 font-mono"
    >
      <div className="flex flex-col h-full items-center justify-evenly p-4 ">
        <div className="shadow-sm shadow-red-700 flex flex-col items-center flex-wrap text-center  leading-relaxed">
          <h1 className="text-3xl">{filme.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
            alt={filme.title}
            className="rounded-lg w-60 my-2"
          />
          <span>{filme.overview}</span>
          <p> Lançamento: {filme.release_date}</p>
          <p>onde acessar: {filme.homepage}</p>
        </div>
      </div>
    </div>
  );
}

/* */
