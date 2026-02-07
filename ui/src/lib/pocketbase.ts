import PocketBase from "pocketbase";

export const pb = new PocketBase(
import.meta.env.DEV ? import.meta.env.VITE_DEV_PB_URL : "/",
);

pb.authStore.onChange(() => {
    // @ts-expect-error original type is missing the actual user fields
    useAuthStore().currentUser = pb.authStore.record;
});
