import React from "react";
import type { Units } from "../../hooks/useUnits";

export default function ForecastDayCard(props: {
    date: string;
    temp: number;
    icon: string;
    units: Units;
}): React.ReactElement {
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-neutral-700 last:border-0">
            <div className="flex items-center gap-4">
                <span className="text-3xl">{props.icon}</span>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {props.temp}°{props.units === "metric" ? "C" : "F"}
                </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-right whitespace-nowrap">
                {props.date}
            </div>
        </div>
    );
}
