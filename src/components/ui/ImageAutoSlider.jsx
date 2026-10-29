import React from "react";
import { Link } from "react-router-dom";

export const ImageAutoSlider = ({ movies = [] }) => {
  // Se não houver filmes, usamos algumas imagens de fallback padrão
  const fallbackImages = [
    "https://cdn.21st.dev/assets/mirror/0b/0b2eee3635f20ec932fa27ae8db24eb760045aee6dd53c6cd05b01799761b6fb.jpg",
    "https://cdn.21st.dev/assets/mirror/a0/a0e1a6affa10f9d1304e1ec7a0a074efa2e5befddbe5f55ec1674ca4606a7272.jpg",
    "https://cdn.21st.dev/assets/mirror/c5/c50a953b2534eeb024de5eb84901abda556e6a8faa74bb6c13983557f14f02e2.jpg",
    "https://cdn.21st.dev/assets/mirror/2c/2c3bda48c0009be1f143cfed1b28a012de388bcd39d662df550ec1d28966b864.jpg",
  ];

  // Prepara os itens do slider (se tiver filmes da API usa os pôsteres e IDs, senão usa fallback)
  const items =
    movies.length > 0
      ? movies.map((m) => ({
          id: m.id,
          url: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : fallbackImages[0],
          title: m.title,
        }))
      : fallbackImages.map((url, i) => ({ id: null, url, title: `Filme ${i + 1}` }));

  // Duplica os itens para criar o loop infinito perfeito
  const duplicatedItems = [...items, ...items];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 25s linear infinite;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>

      <div className="w-full py-4 relative overflow-hidden flex items-center justify-center">
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="scroll-container w-full max-w-7xl">
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedItems.map((item, index) => {
                const content = (
                  <div className="image-item flex-shrink-0 w-36 h-52 sm:w-48 sm:h-72 md:w-56 md:h-80 rounded-xl overflow-hidden shadow-2xl relative bg-red-900 border border-white/10">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                      <p className="text-white text-xs sm:text-sm font-mono font-bold line-clamp-1 text-center">{item.title}</p>
                    </div>
                  </div>
                );

                return item.id ? (
                  <Link key={index} to={`/dashboard/movies/${item.id}`}>
                    {content}
                  </Link>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
