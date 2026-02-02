type LocaleStore = {
    locale: Locales | null
}

export const useLocaleStore = defineStore("locale", {
    state: (): LocaleStore => ({
        locale: null,
    }),
    actions: {
        set(data: Locales) {
            this.locale = data;
        },
        clear() {
            this.locale = null;
        },
    },
});
