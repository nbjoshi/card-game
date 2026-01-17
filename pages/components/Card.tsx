import { useState, useCallback } from "react";
import { motion } from "framer-motion";
const llama = "/llama-gif.gif";
import { useGame } from "../context/GameContext";
import type { Skin } from "../types";

interface CardProps {
  skin: Skin;
}

export default function Card({ skin }: CardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { chosenIds, addChosenId, incrementScore, setGameOver, replaceSkin } =
    useGame();

  const handleClick = useCallback(() => {
    if (chosenIds.includes(skin.id)) {
      setGameOver(true, "lose");
    } else {
      addChosenId(skin.id);
      incrementScore();
    }
  }, [skin.id, chosenIds, setGameOver, addChosenId, incrementScore]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    replaceSkin(skin.id);
  }, [skin.id, replaceSkin]);

  return (
    <motion.button
      className="border-fortnite-blue bg-beige-lighter shadow-fortnite-blue-darker focus:ring-fortnite-blue-dark group relative aspect-[1/1.2] w-full min-w-[100px] overflow-hidden rounded-[1.25rem_2rem] border-[5px] shadow-[0.5rem_0.5rem_0_0] focus:ring-4 focus:outline-none"
      onClick={handleClick}
      aria-label={`Select ${skin.name}`}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="relative h-full w-full">
        <img
          onLoad={handleLoad}
          onError={handleError}
          className={`h-full w-full object-cover transition-opacity duration-300 ${!isLoaded ? "opacity-0" : "opacity-100"}`}
          src={skin.url}
          alt={skin.name}
          loading="lazy"
        />
        {!isLoaded && !hasError && (
          <div
            className="bg-beige-lighter absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <motion.img
              src={llama}
              alt=""
              className="w-1/4"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        )}
      </div>

      {/* Hover overlay with question mark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="text-5xl font-bold text-white [text-shadow:2px_2px_0px_var(--blue-4),4px_4px_0px_rgba(0,0,0,0.25)]">
          ?
        </span>
      </div>
    </motion.button>
  );
}
