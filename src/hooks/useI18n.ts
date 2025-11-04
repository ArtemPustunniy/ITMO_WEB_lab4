import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

const resources = {
    en: { translation: { appTitle: "Weather Dashboard" } },
    ru: { translation: { appTitle: "Погода" } }
};

let initialized = false;

function ensureInit() {
    if (initialized) return;
    i18n.use(initReactI18next).init({
        resources,
        lng: "ru",
        fallbackLng: "en",
        interpolation: { escapeValue: false }
    });
    initialized = true;
}

export function useI18n() {
    ensureInit();
    const [lang, setLang] = useLocalStorage<string>("lang", "ru");
    const tHook = useTranslation();
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);
    return { t: tHook.t, lang, setLang } as const;
}


