import { useFetchJson } from "./useFetchJson";
import { airPollution, currentWeather, forecast5d } from "../services/owm";
import type { OwmLang, OwmUnits } from "../services/owm";

export function useWeather(lat?: number, lon?: number, units: OwmUnits = "metric", lang: OwmLang = "ru") {
    const cw = useFetchJson<any>(
        lat !== undefined && lon !== undefined ? currentWeather(lat, lon, units, lang) : null,
        [lat, lon, units, lang]
    );
    const fc = useFetchJson<any>(
        lat !== undefined && lon !== undefined ? forecast5d(lat, lon, units, lang) : null,
        [lat, lon, units, lang]
    );
    const aqi = useFetchJson<any>(
        lat !== undefined && lon !== undefined ? airPollution(lat, lon) : null,
        [lat, lon]
    );
    return { current: cw, forecast: fc, air: aqi } as const;
}


