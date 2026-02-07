type ProgressTypeStore = {
    progressTypes: ProgressType[];
}

export const useProgressTypeStore = defineStore("progressType", {
    state: (): ProgressTypeStore => ({
        progressTypes: [],
    }),
    actions: {
        set(data: ProgressType[]) {
            this.progressTypes = data;
        },
        clear() {
            this.progressTypes = [];
        },
    },
    persist: true,
});
