import { setI18nLanguage } from "@/i18n";
import { detectLocale } from "@/lib/locale";

export async function loadAndSetLocale(): Promise<void> {
    const locale = detectLocale();

    await setI18nLanguage(locale);
}
