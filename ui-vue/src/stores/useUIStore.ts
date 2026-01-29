type UIStore = {
    isLoading: boolean
    isSearchVisible: boolean
    isSidebarVisible: boolean
}

export const useUIStore = defineStore("ui", {
    state: (): UIStore => ({
        isLoading: true,
        isSearchVisible: false,
        isSidebarVisible: false,
    }),
    persist: true,
});
