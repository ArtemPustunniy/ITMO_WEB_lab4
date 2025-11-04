import React, { useMemo } from "react";
import { useWeather } from "../../hooks/useWeather";
import { useUnits } from "../../hooks/useUnits";
import { Loader, ErrorState, EmptyState } from "../common/States";
import navigationIcon from "../../assets/icons/navigation.png";

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

function getWindDirection(deg: number): string {
    if (deg >= 337.5 || deg < 22.5) return "↑";
    if (deg >= 22.5 && deg < 67.5) return "↗";
    if (deg >= 67.5 && deg < 112.5) return "→";
    if (deg >= 112.5 && deg < 157.5) return "↘";
    if (deg >= 157.5 && deg < 202.5) return "↓";
    if (deg >= 202.5 && deg < 247.5) return "↙";
    if (deg >= 247.5 && deg < 292.5) return "←";
    if (deg >= 292.5 && deg < 337.5) return "↖";
    return "↑";
}

export default function HourlyForecast(props: { lat?: number; lon?: number }): React.ReactElement {
    const { units } = useUnits();
    const { forecast } = useWeather(props.lat, props.lon, units, "ru");

    const data = forecast.data as any;
    const list = data?.list ?? [];

    const hourly = useMemo(() => {
        if (!list.length) return [];
        return list.slice(0, 5).map((item: any) => {
            const date = new Date(item.dt * 1000);
            const timeStr = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
            const temp = Math.round(item.main?.temp ?? 0);
            const wind = (item.wind?.speed ?? 0).toFixed(0);
            const windDeg = item.wind?.deg ?? 0;
            const iconCode = item.weather?.[0]?.id ?? 800;
            const hour = date.getHours();
            const isNight = hour >= 21 || hour < 6;

            return {
                time: timeStr,
                temp,
                wind,
                windDeg,
                windDir: getWindDirection(windDeg),
                icon: getWeatherIcon(iconCode),
                isNight,
            };
        });
    }, [list]);

    if (!props.lat || !props.lon) return <EmptyState message="Выберите город" />;
    if (forecast.loading) return <Loader />;
    if (forecast.error) return <ErrorState message={forecast.error} />;
    if (!forecast.data || !hourly.length) return <EmptyState />;

    return (
        <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white h-full flex flex-col card-shadow">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Hourly Forecast:</h2>
            <div className="flex gap-3 items-stretch flex-1">
                {hourly.map((h: { time: string; temp: number; wind: string; windDeg: number; windDir: string; icon: string; isNight: boolean }, idx: number) => (
                    <div
                        key={idx}
                        className={`flex-1 rounded-xl p-6 flex flex-col items-center justify-between hourly-card ${
                            h.isNight
                                ? "bg-gradient-to-br from-purple-600 to-purple-200"
                                : "bg-gradient-to-br from-orange-500 to-orange-200"
                        }`}
                    >
                        <div className="text-lg font-medium text-gray-900 dark:text-white">{h.time}</div>
                        <div className="text-5xl">{h.icon}</div>
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">{h.temp}°{units === "metric" ? "C" : "F"}</div>
                        <div className="flex flex-col items-center gap-1 text-sm text-gray-900 dark:text-white">
                            <img 
                                src={navigationIcon} 
                                alt="Wind direction" 
                                className="w-8 h-8 object-contain wind-icon"
                                style={{ transform: `rotate(${h.windDeg}deg)` }}
                            />
                            <span>{h.wind} {units === "metric" ? "km/h" : "mph"}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}