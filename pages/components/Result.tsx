import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useGame } from "../context/GameContext";
const win = "/fortnite-win.gif";
const lose = "/crying.gif";

export default function Result() {
  const { result, score, resetGame, goToMenu } = useGame();
  const hasPlayedConfetti = useRef(false);

  // Trigger confetti on win
  useEffect(() => {
    if (result === "win" && !hasPlayedConfetti.current) {
      hasPlayedConfetti.current = true;
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
      });

      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
      }, 250);

      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);
    }
  }, [result]);

  const isWin = result === "win";

  return (
    <motion.section
      className="bg-fortnite-blue shadow-fortnite-blue-darker border-fortnite-blue-light text-fortnite-blue-darker flex max-w-md flex-col items-center justify-center gap-4 rounded-xl border-[0.3rem] p-8 shadow-[0.5rem_0.5rem_0_0]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-labelledby="result-title"
    >
      {isWin ? (
        <>
          <motion.h2
            id="result-title"
            className="text-center text-3xl [text-shadow:2px_2px_0px_var(--blue-2),4px_4px_0px_rgba(0,0,0,0.25)] md:text-4xl"
            initial={{ y: -20, scale: 0.8 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            🎉 You Won! 🎉
          </motion.h2>
          <motion.p
            className="bg-beige-lighter/80 rounded-lg px-4 py-2 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Score: {score}
          </motion.p>
          <motion.img
            className="h-48 w-48 rounded-lg object-contain"
            src={win}
            alt="Victory celebration"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          />
        </>
      ) : (
        <>
          <motion.h2
            id="result-title"
            className="text-center text-3xl [text-shadow:2px_2px_0px_var(--blue-2),4px_4px_0px_rgba(0,0,0,0.25)] md:text-4xl"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Game Over!
          </motion.h2>
          <p className="text-lg">Better luck next time.</p>
          <motion.p
            className="bg-beige-lighter/80 rounded-lg px-4 py-2 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Score: {score}
          </motion.p>
          <motion.img
            className="h-48 w-48 rounded-lg object-contain"
            src={lose}
            alt="Defeat reaction"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          />
        </>
      )}

      <nav className="mt-4 flex gap-4" aria-label="Game options">
        <motion.button
          onClick={goToMenu}
          className="bg-beige-lighter text-fortnite-blue-darker hover:bg-fortnite-blue-darker hover:text-beige-lighter rounded-lg px-6 py-3 text-lg transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Menu
        </motion.button>
        <motion.button
          onClick={resetGame}
          className="bg-fortnite-blue-darker text-beige-lighter hover:bg-beige-lighter hover:text-fortnite-blue-darker rounded-lg px-6 py-3 text-lg transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </nav>
    </motion.section>
  );
}
