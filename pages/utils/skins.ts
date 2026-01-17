import { useQuery } from "@tanstack/react-query";
import type { Difficulty } from "../types";
import { DIFFICULTY_CONFIG } from "../types";
import type { Skin, FortniteAPIResponse } from "../types";
import { mapCosmeticToSkin, shuffle } from "./utils";

const API_URL = "https://fortnite-api.com/v2/cosmetics/br";

async function fetchSkins(numberOfSkins: number): Promise<Skin[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: FortniteAPIResponse = await response.json();

  if (!data?.data) {
    throw new Error("Unexpected API response format");
  }

  const outfitSkins = data.data
    .filter((item) => item.type?.value === "outfit")
    .map(mapCosmeticToSkin);

  const shuffled = shuffle(outfitSkins);
  return shuffled.slice(0, numberOfSkins);
}

export function useSkins(difficulty: Difficulty) {
  const config = difficulty ? DIFFICULTY_CONFIG[difficulty] : null;
  const numberOfSkins = config?.skins ?? 0;

  return useQuery({
    queryKey: ["skins", difficulty, numberOfSkins],
    queryFn: () => fetchSkins(numberOfSkins),
    enabled: !!difficulty && numberOfSkins > 0,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
