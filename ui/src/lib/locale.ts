import { availableLocales } from "@/locales";

export function detectLocale(): Locales {

    const storedLocale: Locales | null = useLocaleStore().locale;
    if (storedLocale !== null) {
        return storedLocale;
    }

    const browserLanguage = navigator.language;

    if (availableLocales.includes(browserLanguage)) {
        return browserLanguage as Locales;
    } else {
        const fallBack = browserLanguage.split("-", 1)[0] as string;
        if (availableLocales.includes(fallBack)) {
            return fallBack as Locales;
        } else {
            return "en-US";
        }
    }
}
