import { useCustomSettingsStore } from "@/stores/useCustomSettingsStore";

export default () => {
    const customSettingsStore = useCustomSettingsStore();

    if (!customSettingsStore.loadedFromFile) {
        customSettingsStore.getCustomSettings();
    }

    return {
        ...customSettingsStore.$state,
    };
};
