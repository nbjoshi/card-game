import { createContext, useContext, useReducer, useCallback, useMemo, type ReactNode } from 'react';
import type { Difficulty, GameResult, Skin } from '../types';
import { DIFFICULTY_CONFIG } from '../types';

// State type
interface GameState {
  difficulty: Difficulty;
  score: number;
  highScore: number;
  chosenIds: string[];
  skins: Skin[];
  isGameOver: boolean;
  result: GameResult;
}

// Action types
type GameAction =
  | { type: 'SET_DIFFICULTY'; payload: Difficulty }
  | { type: 'INCREMENT_SCORE' }
  | { type: 'ADD_CHOSEN_ID'; payload: string }
  | { type: 'SET_SKINS'; payload: Skin[] }
  | { type: 'SET_GAME_OVER'; payload: { isGameOver: boolean; result?: GameResult } }
  | { type: 'RESET_GAME' }
  | { type: 'GO_TO_MENU' }
  | { type: 'REPLACE_SKIN'; payload: string };

// Initial state
const initialState: GameState = {
  difficulty: '',
  score: 0,
  highScore: 0,
  chosenIds: [],
  skins: [],
  isGameOver: false,
  result: '',
};

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };

    case 'INCREMENT_SCORE': {
      const newScore = state.score + 1;
      const newHighScore = Math.max(newScore, state.highScore);

      // Check for win condition
      if (newScore === state.skins.length) {
        return {
          ...state,
          score: newScore,
          highScore: newHighScore,
          isGameOver: true,
          result: 'win',
        };
      }
      return { ...state, score: newScore, highScore: newHighScore };
    }

    case 'ADD_CHOSEN_ID':
      return { ...state, chosenIds: [...state.chosenIds, action.payload] };

    case 'SET_SKINS':
      return { ...state, skins: action.payload };

    case 'SET_GAME_OVER':
      return {
        ...state,
        isGameOver: action.payload.isGameOver,
        result: action.payload.result ?? '',
      };

    case 'RESET_GAME':
      return {
        ...state,
        score: 0,
        chosenIds: [],
        skins: [],
        isGameOver: false,
        result: '',
        // Keep difficulty for restart
      };

    case 'GO_TO_MENU':
      return {
        ...initialState,
        highScore: state.highScore, // Preserve high score
      };

    case 'REPLACE_SKIN': {
      const failedId = action.payload;
      const updatedSkins = state.skins.filter((skin) => skin.id !== failedId);
      const unpickedSkins = state.skins.filter(
        (skin) =>
          !state.chosenIds.includes(skin.id) &&
          !updatedSkins.some((s) => s.id === skin.id)
      );

      if (unpickedSkins.length > 0) {
        const newSkin = unpickedSkins[Math.floor(Math.random() * unpickedSkins.length)];
        return { ...state, skins: [...updatedSkins, newSkin] };
      }
      return state;
    }

    default:
      return state;
  }
}

// Context type with actions
interface GameContextType extends GameState {
  setDifficulty: (difficulty: Difficulty) => void;
  incrementScore: () => void;
  addChosenId: (id: string) => void;
  setSkins: (skins: Skin[]) => void;
  setGameOver: (isGameOver: boolean, result?: GameResult) => void;
  resetGame: () => void;
  goToMenu: () => void;
  replaceSkin: (failedId: string) => void;
  maxScore: number;
  difficultyConfig: { skins: number; display: number } | null;
}

// Create context
const GameContext = createContext<GameContextType | null>(null);

// Provider component
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Memoized actions
  const setDifficulty = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  }, []);

  const incrementScore = useCallback(() => {
    dispatch({ type: 'INCREMENT_SCORE' });
  }, []);

  const addChosenId = useCallback((id: string) => {
    dispatch({ type: 'ADD_CHOSEN_ID', payload: id });
  }, []);

  const setSkins = useCallback((skins: Skin[]) => {
    dispatch({ type: 'SET_SKINS', payload: skins });
  }, []);

  const setGameOver = useCallback((isGameOver: boolean, result?: GameResult) => {
    dispatch({ type: 'SET_GAME_OVER', payload: { isGameOver, result } });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const goToMenu = useCallback(() => {
    dispatch({ type: 'GO_TO_MENU' });
  }, []);

  const replaceSkin = useCallback((failedId: string) => {
    dispatch({ type: 'REPLACE_SKIN', payload: failedId });
  }, []);

  // Derived state
  const maxScore = state.skins.length;
  const difficultyConfig = state.difficulty ? DIFFICULTY_CONFIG[state.difficulty] : null;

  // Memoized context value
  const value = useMemo<GameContextType>(
    () => ({
      ...state,
      setDifficulty,
      incrementScore,
      addChosenId,
      setSkins,
      setGameOver,
      resetGame,
      goToMenu,
      replaceSkin,
      maxScore,
      difficultyConfig,
    }),
    [state, setDifficulty, incrementScore, addChosenId, setSkins, setGameOver, resetGame, goToMenu, replaceSkin, maxScore, difficultyConfig]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Custom hook to use the game context
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
