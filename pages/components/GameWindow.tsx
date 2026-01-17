import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import { useSkins } from "../utils/skins";
import Choices from "./Choices";
const llama = "/llama-gif.gif";

export default function GameWindow() {
  const { difficulty, setSkins, skins, difficultyConfig } = useGame();

  const {
    data: fetchedSkins,
    isLoading,
    isError,
    error,
    refetch,
  } = useSkins(difficulty);

  if (isLoading || skins.length === 0) {
    return (
      <motion.div
        className="bg-beige-lighter/90 flex flex-col items-center justify-center gap-4 rounded-xl p-8 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        role="status"
        aria-live="polite"
      >
        <motion.img
          src={llama}
          alt=""
          aria-hidden="true"
          className="h-24 w-24"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <p className="text-fortnite-blue-darker text-lg">
          Loading your {difficultyConfig?.skins ?? 0} skins....
        </p>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center gap-4 rounded-xl bg-red-100 p-8 text-center shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        role="alert"
      >
        <p className="text-lg text-red-600">
          Failed to load skins: {error?.message}
        </p>
        <motion.button
          onClick={() => refetch()}
          className="bg-fortnite-blue-darker hover:bg-fortnite-blue-dark rounded-lg px-6 py-2 text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  return <Choices />;
}
