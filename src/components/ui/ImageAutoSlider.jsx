import React from "react";
import { Link } from "react-router-dom";

export const ImageAutoSlider = ({ movies = [] }) => {
  const fallbackImages = [
    "https://cdn.21st.dev/assets/mirror/0b/0b2eee3635f20ec932fa27ae8db24eb760045aee6dd53c6cd05b01799761b6fb.jpg",
    "https://cdn.21st.dev/assets/mirror/a0/a0e1a6affa10f9d1304e1ec7a0a074efa2e5befddbe5f55ec1674ca4606a7272.jpg",
    "https://cdn.21st.dev/assets/mirror/c5/c50a953b2534eeb024de5eb84901abda556e6a8faa74bb6c13983557f14f02e2.jpg",
    "https://cdn.21st.dev/assets/mirror/2c/2c3bda48c0009be1f143cfed1b28a012de388bcd39d662df550ec1d28966b864.jpg",
  ];

  const items =
    movies.length > 0
      ? movies.map((m) => ({
          id: m.id,
          url: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : fallbackImages[0],
          title: m.title,
        }))
      : fallbackImages.map((url, i) => ({ id: null, url, title: `Filme ${i + 1}` }));

  const duplicatedItems = [...items, ...items];

  return (
    <div className="w-full max-w-full relative overflow-hidden py-2">
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .infinite-scroll {
          animation: scroll-right 30s linear infinite;
        }
        .infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full max-w-full overflow-hidden">
        <div className="infinite-scroll flex gap-4 w-max px-2">
          {duplicatedItems.map((item, index) => {
            const content = (
              <div className="flex-shrink-0 w-32 h-48 sm:w-40 sm:h-60 rounded-xl overflow-hidden shadow-xl relative bg-red-900 border border-white/10 transition-transform hover:scale-105">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/95 to-transparent">
                  <p className="text-white text-xs font-mono font-bold line-clamp-1 text-center">{item.title}</p>
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
  );
};
