import { useState } from "react";

export default function Main() {
  const [email, setEmail] = useState("");

  function handleSubmitting(e) {
    e.preventDefault();
    if (!email) return;
    alert(`E-mail cadastrado/verificado: ${email}`);
    // Aqui você pode redirecionar para a página de cadastro ou login se quiser
  }

  return (
    <main className="w-full flex-1 flex flex-col justify-center items-center px-4 text-center">
      {/* Caixa central com fundo translúcido escuro estilo streaming/TMDB */}
      <div className="bg-black/60 backdrop-blur-md shadow-2xl shadow-black p-6 sm:p-10 rounded-2xl flex flex-col items-center justify-center max-w-3xl w-full border border-white/10 gap-6">
        {/* Títulos principais */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight font-mono leading-tight">
          Filmes, séries e muito mais. <br className="hidden sm:block" />
          <span>Sem limites.</span>
        </h1>

        <p className="text-xl sm:text-2xl text-blue-300 font-medium font-mono">Assista onde quiser. Cancele quando quiser.</p>

        <p className="text-sm sm:text-base text-gray-300 max-w-xl font-mono">
          Pronto para assistir? Informe seu e-mail para criar ou reiniciar sua assinatura.
        </p>

        {/* Formulário de E-mail */}
        <form onSubmit={handleSubmitting} className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full max-w-xl mt-2">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:flex-1 rounded-xl py-3 px-4 text-black text-lg bg-white/90 outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 shadow-inner"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            Vamos lá &gt;
          </button>
        </form>
      </div>
    </main>
  );
}
