import React, { useMemo } from "react";
import { useWeather } from "../../hooks/useWeather";
import { useUnits } from "../../hooks/useUnits";
import { useI18n } from "../../hooks/useI18n";
import { Loader, ErrorState, EmptyState } from "../common/States";
import ForecastDayCard from "./ForecastDayCard";

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

function formatDate(timestamp: number, lang: string): string {
    const date = new Date(timestamp * 1000);
    const days = lang === "ru" 
        ? ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
        : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = lang === "ru"
        ? ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

export default function ForecastList(props: { lat?: number; lon?: number }): React.ReactElement {
    const { units } = useUnits();
    const { lang } = useI18n();
    const { forecast } = useWeather(props.lat, props.lon, units, lang as any);

    const data = forecast.data as any;
    const list = data?.list ?? [];

    const dailyForecast = useMemo(() => {
        if (!list.length) return [];
        const grouped: Record<string, any[]> = {};
        list.forEach((item: any) => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toDateString();
            if (!grouped[dayKey]) {
                grouped[dayKey] = [];
            }
            grouped[dayKey].push(item);
        });

        return Object.entries(grouped)
            .slice(0, 5)
            .map(([_, items]) => {
                const first = items[0];
                const temps = items.map((i: any) => i.main?.temp ?? 0);
                const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
                const iconCode = first.weather?.[0]?.id ?? 800;

                return {
                    date: first.dt,
                    temp: avgTemp,
                    icon: getWeatherIcon(iconCode),
                };
            });
    }, [list]);


    return (
        <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white h-full card-shadow">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">5 Days Forecast:</h2>
            {!props.lat || !props.lon ? (
                <EmptyState message="Выберите город" />
            ) : forecast.loading ? (
                <Loader />
            ) : forecast.error ? (
                <ErrorState message={forecast.error} />
            ) : !forecast.data || !dailyForecast.length ? (
                <EmptyState />
            ) : (
                <div className="space-y-3">
                    {dailyForecast.map((day) => (
                        <ForecastDayCard
                            key={day.date}
                            date={formatDate(day.date, lang)}
                            temp={day.temp}
                            icon={day.icon}
                            units={units}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
