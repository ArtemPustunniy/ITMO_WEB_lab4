import React from "react";
import { useWeather } from "../../hooks/useWeather";
import { useUnits } from "../../hooks/useUnits";
import { Loader, ErrorState, EmptyState } from "../common/States";
import humidityIcon from "../../assets/icons/humidity.png";
import windIcon from "../../assets/icons/wind.png";
import pressureIcon from "../../assets/icons/pressure-white.png";
import uvIcon from "../../assets/icons/uv-white.png";

export default function WeatherMetrics(props: { lat?: number; lon?: number }): React.ReactElement {
    const { units } = useUnits();
    const { current } = useWeather(props.lat, props.lon, units, "ru");

    if (!props.lat || !props.lon) {
        return (
            <div className="rounded-2xl bg-white shadow ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700">
                <EmptyState message="Выберите город" />
            </div>
        );
    }
    if (current.loading) {
        return (
            <div className="rounded-2xl bg-white shadow ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700">
                <Loader />
            </div>
        );
    }
    if (current.error) {
        return (
            <div className="rounded-2xl bg-white shadow ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700">
                <ErrorState message={current.error} />
            </div>
        );
    }
    if (!current.data) {
        return (
            <div className="rounded-2xl bg-white shadow ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700">
                <EmptyState />
            </div>
        );
    }

    const d = current.data as any;
    const wind = (d.wind?.speed ?? 0).toFixed(1);
    const humidity = d.main?.humidity ?? 0;
    const pressure = d.main?.pressure ?? 0;
    const uv = d.main?.uv ?? 0;

    return (
        <div className="rounded-2xl bg-white shadow ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <img src={humidityIcon} alt="Humidity" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Humidity</span>
                    </div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">{humidity}%</div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <img src={windIcon} alt="Wind" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Wind Speed</span>
                    </div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {wind} {units === "metric" ? "km/h" : "mph"}
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <img src={pressureIcon} alt="Pressure" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Pressure</span>
                    </div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">{pressure} hPa</div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <img src={uvIcon} alt="UV" className="w-5 h-5 object-contain" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">UV</span>
                    </div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">{uv || "—"}</div>
                </div>
            </div>
        </div>
    );
}
