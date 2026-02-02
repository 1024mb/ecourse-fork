import customSettings from "_/customize.json";

type CustomSettingsStore = {
    name: string | null
    logo: string
    logoSize: number
    colorMain: string
    colorDark: string
    loadedFromFile: boolean
}

export const useCustomSettingsStore = defineStore("customSettings", {
    state: (): CustomSettingsStore => ({
        name: null,
        logo: "/logo.svg",
        logoSize: 110,
        colorMain: "#158a8a",
        colorDark: "#040D12",
        loadedFromFile: false,
    }),
    actions: {
        getCustomSettings() {
            this.name = customSettings.name ?? this.name;
            this.logo = customSettings.logo ?? this.logo;
            this.logoSize = customSettings.logo_size ?? this.logoSize;
            this.colorMain = customSettings.colors.main ?? this.colorMain;
            this.colorDark = customSettings.colors.dark ?? this.colorDark;
            this.loadedFromFile = true;
        },
    },
    persist: true,
});
