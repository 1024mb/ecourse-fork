type UIStore = {
    isLoading: boolean
    isSearchVisible: boolean
    isSidebarVisible: boolean
    currentCoursePage: number | undefined
}

export const useUIStore = defineStore("ui", {
    state: (): UIStore => ({
        isLoading: true,
        isSearchVisible: false,
        isSidebarVisible: true,
        currentCoursePage: undefined,
    }),
});
