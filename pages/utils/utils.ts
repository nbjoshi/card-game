import { FortniteCosmetic, Skin } from "../types";

export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function mapCosmeticToSkin(cosmetic: FortniteCosmetic): Skin {
  return {
    id: cosmetic.id,
    name: cosmetic.name,
    url: cosmetic.images.icon,
    picked: false,
  };
}
