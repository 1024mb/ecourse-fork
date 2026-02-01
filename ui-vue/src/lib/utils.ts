import { getI18n } from "@/i18n";
import { toast } from "vue-sonner";

export const updateProgressStatus = async (progressRecordId: string, newStatus: Status) => {
    const i18n = getI18n();

    try {
        const data = {
            status: newStatus,
        };

        return await pb.collection("progress").update(progressRecordId, data);
    } catch {
        toast.error(i18n.global.t("errorMsg.failedToUpdateCourseStatus"));
    }
};
