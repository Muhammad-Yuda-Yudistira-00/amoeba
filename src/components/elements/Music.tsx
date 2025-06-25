"use client"

import { useEffect, useRef, useState } from "react";

export default function Music() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute opacity-75 w-full left-0 top-0 md:px-8 md:pr-72"
    >
      <div className="flex justify-center items-center h-full py-8">
        <p className="text-7xl font-extrabold text-white font-horsePuke">
          play music
        </p>
      </div>

      {isVisible && (
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/0nAJQxdsK0ToL7vLLEWm45?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}
    </div>
  );
}
