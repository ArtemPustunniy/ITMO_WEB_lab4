import React from "react";
import { useTheme } from "../../hooks/useTheme";
// import { useUnits } from "../../hooks/useUnits";
// import { useI18n } from "../../hooks/useI18n";

export default function Toggles(): React.ReactElement {
    const { theme, setTheme } = useTheme();
    // const { units, setUnits } = useUnits();
    // const { lang, setLang } = useI18n();

    return (
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <span>{theme === "dark" ? "Dark" : "Light"} Mode</span>
            <div className="relative inline-block">
                <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                    className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${
                    theme === "dark" ? "bg-gray-300" : "bg-gray-300"
                }`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-black shadow-md transform transition-transform duration-200 ${
                        theme === "dark" ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                </div>
            </div>
        </label>
    );
}