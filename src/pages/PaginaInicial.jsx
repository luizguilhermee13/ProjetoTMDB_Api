import { Link } from "react-router-dom";
import Main from "../components/ui/ContainerMain";

export default function InicialPage() {
  return (
    <div className="imgfundo max-w-screen h-screen p-1  text-white text-border flex flex-col ">
      <Header />
      <Main />
    </div>
  );
}

export function Header() {
  return (
    <header
      className="w-full h-20 flex justify-between items-center px-6 sm:px-10
     bg-black/40 backdrop-blur-md border-b border-white/10 shadow-lg rounded-lg"
    >
      {/* Div Logo */}
      <div className="flex items-center h-10">
        <img className="w-32 sm:w-36 h-auto object-contain" src="public/assets/themoviedbLogo.png" alt="Logo TMDB" />
      </div>

      {/* Div Idiomas e Entrar */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Seletor de Idioma */}
        <div className="h-10">
          <select
            name="linguagem"
            id="idiomas"
            className="bg-black/40 text-white border border-white/30 rounded-xl px-3 py-1 h-full text-sm sm:text-base outline-none hover:bg-white/10 transition-colors cursor-pointer"
          >
            <option value="pt" className="bg-gray-900 text-white">
              Português
            </option>
            <option value="en" className="bg-gray-900 text-white">
              Inglês
            </option>
          </select>
        </div>

        {/* Botão Entrar */}
        <div className="h-10">
          <Link to={"/login"} className="h-full inline-block">
            <button className="h-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 rounded-xl transition-colors shadow-md cursor-pointer text-sm sm:text-base flex items-center justify-center">
              Entrar
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
