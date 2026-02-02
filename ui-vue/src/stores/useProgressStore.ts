type ProgressStore = {
    progress: Progress[];
}

export const useProgressStore = defineStore("progress", {
    state: (): ProgressStore => ({
        progress: [],
    }),
    actions: {
        set(data: Progress[]) {
            this.progress = data;
        },
        clear() {
            this.progress = [];
        },
    },
    persist: true,
});
