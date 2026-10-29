import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export const CircularGallery = React.forwardRef(({ items, className, radius = 450, autoRotateSpeed = 0.015, ...props }, ref) => {
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      const scrollRotation = scrollProgress * 360;
      setRotation(scrollRotation);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const autoRotate = () => {
      if (!isScrolling) {
        setRotation((prev) => prev + autoRotateSpeed);
      }
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };

    animationFrameRef.current = requestAnimationFrame(autoRotate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isScrolling, autoRotateSpeed]);

  if (!items || items.length === 0) return null;

  const anglePerItem = 360 / items.length;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Circular 3D Gallery"
      className={cn("relative w-full h-full flex items-center justify-center", className)}
      style={{ perspective: "2000px" }}
      {...props}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem;
          const totalRotation = rotation % 360;
          const relativeAngle = (itemAngle + totalRotation + 360) % 360;
          const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
          const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

          return (
            <div
              key={item.id || i}
              role="group"
              aria-label={item.common}
              className="absolute w-[240px] sm:w-[280px] h-[360px] sm:h-[400px]"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                left: "50%",
                top: "50%",
                marginLeft: "-140px",
                marginTop: "-200px",
                opacity: opacity,
                transition: "opacity 0.3s linear",
              }}
            >
              <Link
                to={`/dashboard/movies/${item.id}`}
                className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-white/20 bg-black/40 backdrop-blur-md flex flex-col block hover:scale-105 transition-transform"
              >
                <img src={item.photo.url} alt={item.photo.text} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white">
                  <h2 className="text-lg font-bold font-mono line-clamp-1">{item.common}</h2>
                  <p className="text-xs opacity-80 mt-0.5">{item.binomial}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
});

CircularGallery.displayName = "CircularGallery";
