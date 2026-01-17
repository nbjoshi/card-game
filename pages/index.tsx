import { SnowOverlay } from "react-snow-overlay";
import { motion } from "framer-motion";
import { useGame } from "./context/GameContext";
import Menu from "./components/Menu";
import GameWindow from "./components/GameWindow";
import Result from "./components/Result";

export default function App() {
  const { difficulty, isGameOver, highScore } = useGame();

  return (
    <div className="flex min-h-screen flex-col items-center">
      <SnowOverlay />
      <motion.header
        className="border-fortnite-blue-dark shadow-fortnite-blue-darker text-fortnite-blue-darker bg-beige-lighter hover:bg-fortnite-blue-dark mx-6 my-6 flex w-[70%] max-w-5xl flex-col items-center justify-center rounded-[1.5rem_2.5rem] border-[0.5rem] p-7 shadow-[0.8rem_0.8rem_0_0] transition-all duration-200 ease-in-out"
        animate={{ y: [0, -3, 0, 3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ y: -8 }}
      >
        <h1 className="text-center text-4xl italic [text-shadow:2px_2px_0px_var(--blue-2),4px_4px_0px_rgba(0,0,0,0.25)] md:text-5xl">
          Fortnite Memory Game
        </h1>
        <p aria-live="polite" className="mt-2 text-lg">
          High Score: {highScore}
        </p>
      </motion.header>

      <main className="flex w-full flex-row items-center justify-center p-4">
        {difficulty === "" ? (
          <Menu />
        ) : isGameOver ? (
          <Result />
        ) : (
          <GameWindow />
        )}
      </main>
    </div>
  );
}
