type LessonResourcesStore = {
    lessonResources: LessonResource[];
}

export const useLessonResourcesStore = defineStore("lessonResources", {
    state: (): LessonResourcesStore => ({
        lessonResources: [],
    }),
    actions: {
        set(data: LessonResource[]) {
            this.lessonResources = data;
        },
        clear() {
            this.lessonResources = [];
        },
    },
    persist: true,
});
