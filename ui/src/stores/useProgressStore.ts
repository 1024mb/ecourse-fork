type ProgressStore = {
    progress: ProgressStored[];
}

export const useProgressStore = defineStore("progress", {
    state: (): ProgressStore => ({
        progress: [],
    }),
    actions: {
        set(data: ProgressStored[]) {
            this.progress = data;
        },
        clear() {
            this.progress = [];
        },
    },
    persist: true,
});
