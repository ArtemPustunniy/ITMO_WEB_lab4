import { useLocalStorage } from "./useLocalStorage";

export type Units = "metric" | "imperial";

export function useUnits() {
    const [units, setUnits] = useLocalStorage<Units>("units", "metric");
    return { units, setUnits } as const;
}


