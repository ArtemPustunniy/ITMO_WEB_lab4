import React from "react";
import { useWeather } from "../../hooks/useWeather";
import { useUnits } from "../../hooks/useUnits";
import { useI18n } from "../../hooks/useI18n";
import { Loader, ErrorState, EmptyState } from "../common/States";
import sunriseWhiteIcon from "../../assets/icons/sunrise-white.png";
import sunsetWhiteIcon from "../../assets/icons/sunset-white.png";
import sunriseBlackIcon from "../../assets/icons/sunrise-black.png";
import sunsetBlackIcon from "../../assets/icons/sunset-black.png";
import humidityIcon from "../../assets/icons/humidity.png";
import windIcon from "../../assets/icons/wind.png";
import pressureIcon from "../../assets/icons/pressure-white.png";
import uvIcon from "../../assets/icons/uv-white.png";

function formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function getWeatherIcon(code: number): string {
    const icons: Record<number, string> = {
        200: "⛈️", 201: "⛈️", 202: "⛈️",
        210: "🌩️", 211: "🌩️", 212: "🌩️",
        221: "🌩️", 230: "⛈️", 231: "⛈️", 232: "⛈️",
        300: "🌦️", 301: "🌦️", 302: "🌦️",
        310: "🌦️", 311: "🌦️", 312: "🌦️",
        313: "🌦️", 314: "🌦️", 321: "🌦️",
        500: "🌧️", 501: "🌧️", 502: "🌧️",
        503: "🌧️", 504: "🌧️", 511: "🌨️",
        520: "🌦️", 521: "🌦️", 522: "🌦️",
        531: "🌦️",
        600: "❄️", 601: "❄️", 602: "❄️",
        611: "🌨️", 612: "🌨️", 613: "🌨️",
        615: "🌨️", 616: "🌨️", 620: "🌨️",
        621: "🌨️", 622: "🌨️",
        701: "🌫️", 711: "🌫️", 721: "🌫️",
        731: "🌫️", 741: "🌫️", 751: "🌫️",
        761: "🌫️", 762: "🌫️", 771: "🌪️",
        781: "🌪️",
        800: "☀️",
        801: "⛅", 802: "⛅", 803: "☁️", 804: "☁️",
    };
    return icons[code] ?? "☀️";
}

export default function CurrentWeatherCard(props: { lat?: number; lon?: number }): React.ReactElement {
    const { units } = useUnits();
    const { lang } = useI18n();
    const { current } = useWeather(props.lat, props.lon, units, lang as any);

    if (!props.lat || !props.lon) {
        return (
            <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white card-shadow">
                <EmptyState message="Выберите город" />
            </div>
        );
    }
    if (current.loading) {
        return (
            <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white card-shadow">
                <Loader />
            </div>
        );
    }
    if (current.error) {
        return (
            <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white card-shadow">
                <ErrorState message={current.error} />
            </div>
        );
    }
    if (!current.data) {
        return (
            <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white card-shadow">
                <EmptyState />
            </div>
        );
    }

    const d = current.data as any;
    const temp = Math.round(d.main?.temp ?? 0);
    const feels = Math.round(d.main?.feels_like ?? 0);
    const desc = d.weather?.[0]?.description ?? "";
    const icon = getWeatherIcon(d.weather?.[0]?.id ?? 800);
    const sunrise = d.sys?.sunrise ? formatTime(d.sys.sunrise) : "";
    const sunset = d.sys?.sunset ? formatTime(d.sys.sunset) : "";
    const wind = (d.wind?.speed ?? 0).toFixed(1);
    const humidity = d.main?.humidity ?? 0;
    const pressure = d.main?.pressure ?? 0;
    const uv = d.main?.uv ?? 0;

    return (
        <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white card-shadow h-full">
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                        {temp}°{units === "metric" ? "C" : "F"}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 mb-4">Feels like: {feels}°</div>
                    {(sunrise || sunset) && (
                        <div className="space-y-3">
                            {sunrise && (
                                <div className="flex items-start gap-2">
                                    <span className="w-6 h-6 mt-0.5 inline-block relative">
                                        {/* Светлая тема — чёрная иконка */}
                                        <img
                                            src={String(sunriseBlackIcon)}
                                            alt="Sunrise"
                                            className="w-6 h-6 object-contain dark:hidden"
                                        />
                                        {/* Тёмная тема — белая иконка */}
                                        <img
                                            src={String(sunriseWhiteIcon)}
                                            alt="Sunrise"
                                            className="w-6 h-6 object-contain hidden dark:block"
                                        />
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-600 dark:text-gray-400">Sunrise</span>
                                        <span className="text-gray-500 dark:text-gray-500">{sunrise}</span>
                                    </div>
                                </div>
                            )}
                            {sunset && (
                                <div className="flex items-start gap-2">
                                    <span className="w-6 h-6 mt-0.5 inline-block relative">
                                        {/* Светлая тема — чёрная иконка */}
                                        <img
                                            src={String(sunsetBlackIcon)}
                                            alt="Sunset"
                                            className="w-6 h-6 object-contain dark:hidden"
                                        />
                                        {/* Тёмная тема — белая иконка */}
                                        <img
                                            src={String(sunsetWhiteIcon)}
                                            alt="Sunset"
                                            className="w-6 h-6 object-contain hidden dark:block"
                                        />
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-600 dark:text-gray-400">Sunset</span>
                                        <span className="text-gray-500 dark:text-gray-500">{sunset}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex-shrink-0 -ml-25">
                    <div className="flex flex-col items-center">
                        <div className="text-9xl mb-10">{icon}</div>
                        <div className="text-2xl font-medium text-gray-900 dark:text-white capitalize">{desc}</div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 gap-y-6">
                        <div className="flex flex-col items-center">
                            <img src={humidityIcon} alt="Humidity" className="w-10 h-10 object-contain mb-2" />
                            <div className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{humidity}%</div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Humidity</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={windIcon} alt="Wind" className="w-10 h-10 object-contain mb-2" />
                            <div className="text-xl font-semibold text-gray-900 dark:text-white mb-1 whitespace-nowrap">
                                {wind}{units === "metric" ? "km/h" : "mph"}
                            </div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Wind Speed</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={pressureIcon} alt="Pressure" className="w-10 h-10 object-contain mb-2" />
                            <div className="text-xl font-semibold text-gray-900 dark:text-white mb-1 whitespace-nowrap">{pressure}hPa</div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Pressure</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={uvIcon} alt="UV" className="w-10 h-10 object-contain mb-2" />
                            <div className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{uv || "—"}</div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">UV</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}