import { nextTick } from "vue";
import { createI18n, type I18n } from "vue-i18n";
import { locales } from "./locales";

type AppI18n = I18n<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, string, false>

let _i18n: AppI18n | null = null;

export async function setupI18n(options?: {
    locale?: Locales;
}): Promise<AppI18n> {
    const locale: Locales = options?.locale ?? "en-US";

    const i18n = createI18n({
        locale,
        fallbackLocale: "en-US",
        legacy: false,
        globalInjection: true,
        messages: {},
    });

    await loadLocaleMessages("en-US", i18n); // always load the fallback
    await setI18nLanguage(locale, i18n);

    _i18n = i18n;
    return i18n;
}

export function getI18n(): AppI18n {
    if (!_i18n) {
        throw new Error("i18n has not been initialized. Call setupI18n() first.");
    }

    return _i18n;
}

export async function setI18nLanguage(
    locale: Locales,
    i18n?: AppI18n,
): Promise<void> {
    if (!i18n) {
        i18n = getI18n();
    }

    await loadLocaleMessages(locale, i18n);

    i18n.global.locale.value = locale;
    i18n.global.fallbackLocale.value = "en-US";

    document.documentElement.setAttribute("lang", locale);
}

export async function loadLocaleMessages(
    locale: Locales,
    i18n?: AppI18n,
): Promise<void> {
    if (!i18n) {
        i18n = getI18n();
    }

    if (!i18n.global.availableLocales.includes(locale)) {
        const messages = await locales[locale]();
        i18n.global.setLocaleMessage(locale, messages.default);
    }

    await nextTick();
}
