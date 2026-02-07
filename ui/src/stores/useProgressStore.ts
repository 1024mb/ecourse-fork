type ProgressStore = {
    progress: CourseProgressStored[];
}

export const useProgressStore = defineStore("progress", {
    state: (): ProgressStore => ({
        progress: [],
    }),
    actions: {
        set(data: CourseProgressStored[]) {
            this.progress = data;
        },
        clear() {
            this.progress = [];
        },
    },
    persist: true,
});
