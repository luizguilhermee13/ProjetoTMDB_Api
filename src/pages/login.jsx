import { Link, useNavigate } from "react-router-dom";
import { Film, Star, TrendingUp, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  // Função simples apenas para simular o login e mandar pro dashboard
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row bg-[#081c22] text-white overflow-hidden">
      {/* ================= LADO ESQUERDO: Branding / Destaques do TMDB ================= */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-[#0d253f] to-[#04151b] border-r border-white/10 relative">
        {/* Logo do TMDB ou Título */}
        <div className="flex items-center gap-3">
          <div className="bg-[#01b4e4] p-2 rounded-xl text-[#0d253f] font-bold shadow-lg">
            <Film className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-wider font-mono">TMDB Explorer</span>
        </div>

        {/* Lista de Recursos / Vantagens (Inspirado no modelo do MUI) */}
        <div className="flex flex-col gap-8 max-w-md">
          <h1 className="text-4xl font-extrabold tracking-tight font-mono leading-tight">Descubra o melhor do cinema mundial.</h1>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#01b4e4]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Tendências em Tempo Real</h3>
              <p className="text-sm text-gray-400">Acompanhe os filmes e séries mais populares avaliados por milhões de usuários.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#21d07a]">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Catálogo Completo</h3>
              <p className="text-sm text-gray-400">Acesse informações detalhadas sobre elencos, diretores, sinopses e avaliações.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Experiência Personalizada</h3>
              <p className="text-sm text-gray-400">Salve seus filmes favoritos e gerencie listas exclusivas para assistir depois.</p>
            </div>
          </div>
        </div>

        {/* Rodapé esquerdo */}
        <div className="text-xs text-gray-500 font-mono">© 2026 TMDB Project. Todos os direitos reservados.</div>
      </div>

      {/* ================= LADO DIREITO: Card de Login ================= */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-[#04151b]">
        <div className="w-full max-w-md bg-[#0d253f]/60 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-8 flex flex-col gap-6">
          {/* Cabeçalho do Card */}
          <div>
            <h2 className="text-3xl font-bold font-mono tracking-wide text-white">Entrar</h2>
            <p className="text-sm text-gray-400 mt-1">Bem-vindo de volta! Acesse sua conta.</p>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                defaultValue="usuario@tmdb.com"
                required
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#01b4e4] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Senha</label>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-[#01b4e4] hover:underline">
                  Esqueceu sua senha?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                defaultValue="123456"
                required
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#01b4e4] transition-colors"
              />
            </div>

            {/* Botão de Entrar (Leve direto para o dashboard sem validação pesada) */}
            <button
              type="submit"
              className="mt-2 w-full bg-[#01b4e4] hover:bg-[#0090bd] text-[#0d253f] font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer shadow-lg text-center"
            >
              Entrar
            </button>
          </form>

          {/* Link para voltar ou alternar */}
          <div className="text-center text-sm text-gray-400">
            Não tem uma conta? <span className="text-[#01b4e4] cursor-pointer hover:underline">Cadastre-se</span>
          </div>

          {/* Link rápido de segurança para garantir a rota */}
          <div className="pt-2 border-t border-white/10 text-center">
            <Link to={"/"} className="text-xs text-gray-400 hover:text-white transition-colors">
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
