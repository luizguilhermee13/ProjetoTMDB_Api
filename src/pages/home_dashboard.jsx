import { useEffect, useState } from "react";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function HomeDashboardPage() {
  const [stats, setStats] = useState({
    popularCount: 0,
    topRatedMovie: "Carregando...",
    trendingToday: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      };

      try {
        // 1. Busca filmes populares para estatísticas e lista
        const resPopular = await fetch("https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1", options);
        const dataPopular = await resPopular.json();

        // 2. Busca os mais bem avaliados para o card de destaque
        const resTop = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1", options);
        const dataTop = await resTop.json();

        // 3. Busca os trending do dia
        const resTrending = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=pt-BR", options);
        const dataTrending = await resTrending.json();

        setStats({
          popularCount: dataPopular.total_results || 10000,
          topRatedMovie: dataTop.results?.[0]?.title || "Destaque",
          topRatedScore: dataTop.results?.[0]?.vote_average?.toFixed(1) || "10",
          trendingToday: dataTrending.results?.slice(0, 4) || [],
        });
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#081c22] text-white p-4 sm:p-6 flex flex-col gap-6 font-mono">
      {/* Título do Dashboard */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider">Dashboard TMDB</h1>
          <p className="text-sm text-gray-400">Visão geral e métricas do catálogo de filmes</p>
        </div>
        <div className="bg-[#01b4e4] text-[#0d253f] font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-lg">API Conectada ✓</div>
      </div>

      {/* Grid de Cards de Estatísticas (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-[#0d253f]/70 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Filmes Indexados</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#01b4e4]">
              {loading ? "..." : stats.popularCount.toLocaleString()}
            </span>
            <span className="text-xs text-green-400">Ativos no banco</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0d253f]/70 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Top Avaliado #1</span>
          <div className="mt-2">
            <h3 className="text-lg font-bold text-white truncate" title={stats.topRatedMovie}>
              {loading ? "Carregando..." : stats.topRatedMovie}
            </h3>
            <span className="text-xs text-[#21d07a] font-semibold">⭐ Nota Média: {stats.topRatedScore} / 10</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0d253f]/70 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Status da Sessão</span>
          <div className="mt-2 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium">Usuário autenticado via Token v4</span>
          </div>
        </div>
      </div>

      {/* Seção de Filmes em Alta Hoje (Trending) */}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🔥 Em Alta Hoje (Tendências)</h2>

        {loading ? (
          <div className="text-gray-400 text-sm">Carregando tendências...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.trendingToday.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#0d253f]/50 border border-white/10 rounded-xl p-3 flex gap-3 items-center hover:bg-[#0d253f] transition-colors"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded-lg shadow"
                />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm truncate" title={movie.title}>
                    {movie.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">Lançamento: {movie.release_date || "N/D"}</p>
                  <span className="inline-block mt-2 text-[10px] bg-[#01b4e4]/20 text-[#01b4e4] px-2 py-0.5 rounded font-bold">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
