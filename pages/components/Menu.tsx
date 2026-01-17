import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import type { Difficulty } from '../types';

const difficulties = [
  { value: 'easy' as const, label: 'Easy', hoverColor: 'hover:text-green-400' },
  { value: 'medium' as const, label: 'Medium', hoverColor: 'hover:text-yellow-400' },
  { value: 'hard' as const, label: 'Hard', hoverColor: 'hover:text-red-400' },
];

export default function Menu() {
  const { setDifficulty } = useGame();

  function handleChangeDifficulty(difficulty: Difficulty) {
    if (difficulty) {
      setDifficulty(difficulty);
    }
  }

  return (
    <motion.section
      className="text-fortnite-blue-darker shadow-[0.5rem_0.5rem_0_0] shadow-fortnite-blue-darker
        border-[0.3rem] border-fortnite-blue-light rounded-xl
        bg-fortnite-blue p-8 max-w-[90%] text-center
        flex flex-col justify-center items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      aria-labelledby="menu-title"
    >
      <motion.div
        className="mb-7 bg-fortnite-blue-light px-4 py-2 rounded-[0.5rem_1rem]
          shadow-[0.5rem_0.5rem_0_0] shadow-fortnite-blue-darker
          [text-shadow:1px_1px_0px_var(--blue-2),3px_3px_0px_rgba(0,0,0,0.25)]"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 id="menu-title" className="text-2xl">Choose a difficulty!</h2>
      </motion.div>

      <nav className="w-full mb-8 gap-4 flex flex-col justify-center items-center" aria-label="Difficulty selection">
        {difficulties.map((diff, index) => (
          <motion.button
            key={diff.value}
            onClick={() => handleChangeDifficulty(diff.value)}
            className={`w-[70%] py-3 px-4 rounded-[0.5rem_1rem] border-0
              bg-beige-lighter text-fortnite-blue-darker text-lg
              hover:bg-fortnite-blue-darker hover:translate-x-2
              transition-all duration-150 ease-in-out ${diff.hoverColor}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-describedby="rules"
          >
            {diff.label}
          </motion.button>
        ))}
      </nav>

      <motion.p
        id="rules"
        className="text-sm bg-beige-lighter/80 px-4 py-2 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <strong>Rules:</strong>
        <br />
        Don't pick the same skin twice!
      </motion.p>
    </motion.section>
  );
}
