import { useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Card from './Card';
import type { Skin } from '../types';

export default function Choices() {
  const { skins, score, chosenIds, difficultyConfig, maxScore } = useGame();

  const displayCount = difficultyConfig?.display ?? 3;

  // Get a random unpicked skin
  const getUnpicked = useCallback((): Skin | undefined => {
    const unpicked = skins.filter((skin) => !chosenIds.includes(skin.id));
    if (unpicked.length === 0) return undefined;
    return unpicked[Math.floor(Math.random() * unpicked.length)];
  }, [skins, chosenIds]);

  // Populate display options with one correct answer and random others
  const populateOptions = useCallback(
    (chosenOne: Skin, count: number): Skin[] => {
      const pickedIds = new Set<string>([chosenOne.id]);
      const options: Skin[] = [chosenOne];

      while (options.length < count && options.length < skins.length) {
        const randomIndex = Math.floor(Math.random() * skins.length);
        const skin = skins[randomIndex];

        if (!pickedIds.has(skin.id)) {
          options.push(skin);
          pickedIds.add(skin.id);
        }
      }

      return options;
    },
    [skins]
  );

  // Generate display options (memoized to prevent re-shuffle on every render)
  const displayOptions = useMemo(() => {
    const chosenOne = getUnpicked();
    if (!chosenOne) return [];

    const options = populateOptions(chosenOne, displayCount);

    // Fisher-Yates shuffle
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, [getUnpicked, populateOptions, displayCount, score]); // Re-shuffle when score changes

  return (
    <motion.section
      className="flex flex-col items-center justify-center p-4 w-full max-w-5xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      aria-label="Memory game"
    >
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 w-full max-w-3xl mb-6"
        role="group"
        aria-label="Choose a skin you haven't picked yet"
      >
        <AnimatePresence mode="popLayout">
          {displayOptions
            .filter((skin) => skin && skin.id)
            .map((skin) => (
              <motion.div
                key={skin.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Card skin={skin} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <motion.p
        className="text-2xl text-fortnite-blue-darker bg-beige-lighter/90
          px-6 py-3 rounded-xl shadow-lg
          [text-shadow:1px_1px_0px_var(--blue-2),2px_2px_0px_rgba(0,0,0,0.15)]"
        aria-live="polite"
        key={score}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Score: {score}/{maxScore}
      </motion.p>
    </motion.section>
  );
}
