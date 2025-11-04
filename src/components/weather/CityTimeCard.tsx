import React from "react";
import { useI18n } from "../../hooks/useI18n";

function formatTime(date: Date): string {
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function formatDate(date: Date, lang: string): string {
    const days = lang === "ru" 
        ? ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
        : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = lang === "ru"
        ? ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

export default function CityTimeCard(props: {
    city?: string;
    timezone?: number;
}): React.ReactElement {
    const { lang } = useI18n();
    const now = new Date();
    if (props.timezone) {
        const offset = props.timezone * 1000;
        now.setTime(now.getTime() + offset);
    }

    const timeStr = formatTime(now);
    const dateStr = formatDate(now, lang);

    return (
        <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-6 dark:bg-neutral-800 dark:ring-neutral-700 dark:text-white h-full flex flex-col justify-center card-shadow">
            {props.city ? (
                <div className="text-center">
                    <div className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">{props.city}</div>
                    <div className="text-8xl font-bold text-gray-900 dark:text-white">{timeStr}</div>
                    <div className="text-xl text-gray-600 dark:text-gray-400 mt-2 capitalize">{dateStr}</div>
                </div>
            ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">Выберите город</div>
            )}
        </div>
    );
}
