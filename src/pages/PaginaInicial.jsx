import { Link } from "react-router-dom";

export default function InicialPage() {
  return (
    <div className="imgfundo max-w-screen h-screen p-2  text-white text-border flex flex-col ">
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  return (
    <div className=" w-full h-24 flex justify-between px-8 shadow-sm shadow-blue-400">
      {/* Div logo*/}
      <div className="p-2">
        <img
          className="w-40 h-full"
          src="public/assets/themoviedbLogo.png"
          alt="logo"
        />
      </div>
      {/* Div idiomas*/}
      <div className="flex gap-4 items-center">
        <div className="h-10">
          <select
            name="linguagem"
            id="idiomas"
            className="bg-transparent hover:bg-blue-400 border border-white rounded-sm p-1 h-full"
          >
            <option>Português</option>
            <option>Inglês</option>
          </select>
        </div>
        {/* Div Entrar/Login */}
        <div className="h-10">
          <Link to={"/login"}>
            <button className="h-full bg-blue-400 rounded-sm p-2 px-4 hover:bg-blue-600">
              {" "}
              Entrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-center items-center leading-relaxed font-mono  ">
      <div className="bg-transparent shadow-xl shadow-black p-2 h-80 rounded-md  flex items-center">
        <div className="flex flex-col  justify-around h-full w-[90%] md:w-full ">
          <p className="text-4xl">Filmes, séries e muito mais. Sem limites.</p>
          <p className="text-3xl">
            Assista onde quiser. Cancele quando quiser.
          </p>
          <p className="text-xl">
            Pronto para assistir? Informe seu email para criar ou reiniciar sua
            assinatura.
          </p>
          <form className="flex justify-center text-[2.6em]">
            <input
              type="text"
              placeholder="Digite seu E-mail"
              className="w-[80%] sm:w-full"
            />
            <input
              className="bg-blue-400 hover:bg-blue-600 px-1 rounded-r-md"
              type="button"
              value="Vamos la"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
