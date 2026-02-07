import { getI18n } from "@/i18n";
import { toast } from "vue-sonner";


export async function useFetchRecords() {
    const i18n = getI18n();

    try {
        const lessonRecords = await fetchLessons();
        const progressTypeRecords = await fetchProgressTypes();
        const resourceRecords = await fetchResources();

        useLessonsStore().set(lessonRecords);
        useProgressTypeStore().set(progressTypeRecords);
        useResourcesStore().set(resourceRecords);

    } catch (error) {
        console.error(error);
        toast.error(i18n.global.t("errorMsg.loadDataFailed"));
    }
}
