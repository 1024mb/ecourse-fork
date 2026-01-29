type ResourcesStore = {
    resources: Resource[];
}

export const useResourcesStore = defineStore("resources", {
    state: (): ResourcesStore => ({
        resources: [],
    }),
    actions: {
        set(data: Resource[]) {
            this.resources = data;
        },
        clear() {
            this.resources = [];
        },
    },
});
