type AuthStore = {
    currentUser: User | null;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthStore => ({
        // @ts-expect-error original type is missing the actual user fields
        currentUser: pb.authStore.record,
    }),
    persist: true,
});
