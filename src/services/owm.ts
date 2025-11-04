const API = "https://api.openweathermap.org";
const KEY = import.meta.env.VITE_OWM_API_KEY as string | undefined;

export type OwmUnits = "metric" | "imperial";
export type OwmLang = "ru" | "en";

export function owmUrl(path: string, params: Record<string, string | number | undefined>): string {
    const url = new URL(path, API);
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
    if (KEY) url.searchParams.set("appid", KEY);
    return url.toString();
}

export function geocodeCity(q: string) {
    return owmUrl("/geo/1.0/direct", { q, limit: 5 });
}

export function reverseGeocode(lat: number, lon: number) {
    return owmUrl("/geo/1.0/reverse", { lat, lon, limit: 1 });
}

export function currentWeather(lat: number, lon: number, units: OwmUnits, lang: OwmLang) {
    return owmUrl("/data/2.5/weather", { lat, lon, units, lang });
}

export function forecast5d(lat: number, lon: number, units: OwmUnits, lang: OwmLang) {
    return owmUrl("/data/2.5/forecast", { lat, lon, units, lang });
}

export function airPollution(lat: number, lon: number) {
    return owmUrl("/data/2.5/air_pollution", { lat, lon });
}


