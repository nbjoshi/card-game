// Game Types
export interface Skin {
  id: string;
  name: string;
  url: string;
  picked: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard' | '';
export type GameResult = 'win' | 'lose' | '';

// Component Props Types
export interface MenuProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
}

export interface GameWindowProps {
  difficulty: Difficulty;
  setIsGameOver: (isGameOver: boolean) => void;
  setEndScore: (score: number) => void;
  setResult: (result: GameResult) => void;
}

export interface ChoicesProps {
  copyData: Skin[];
  setIsGameOver: (isGameOver: boolean) => void;
  numberOfSkins: number;
  setEndScore: (score: number) => void;
  setResult: (result: GameResult) => void;
}

export interface CardProps {
  id: string;
  url: string;
  onErrorReplace: (id: string) => void;
  chosenIds: string[];
  setChosenIds: React.Dispatch<React.SetStateAction<string[]>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: (isGameOver: boolean) => void;
  setEndScore: (score: number) => void;
  maxScore: number;
  setResult: (result: GameResult) => void;
}

export interface ResultProps {
  result: GameResult;
  handleMenuButton: () => void;
  handleRestartGame: () => void;
  endScore: number;
}

// API Response Types
export interface FortniteCosmetic {
  id: string;
  name: string;
  images: {
    icon: string;
    smallIcon?: string;
    featured?: string;
  };
  type: {
    value: string;
    displayValue: string;
  };
}

export interface FortniteAPIResponse {
  status: number;
  data: FortniteCosmetic[];
}

// Difficulty configuration
export const DIFFICULTY_CONFIG = {
  easy: { skins: 5, display: 3 },
  medium: { skins: 10, display: 5 },
  hard: { skins: 15, display: 7 },
} as const;
