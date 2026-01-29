import { getI18n } from "@/i18n";
import { pb } from "@/lib/pocketbase.ts";
import { useAlertStore } from "@/stores/useAlertStore.ts";
import type { Status } from "@/types/collections";

export const updateProgressStatus = async (progressRecordId: string, newStatus: Status) => {
    const i18n = getI18n();

    try {
        const data = {
            status: newStatus,
        };

        return await pb.collection("progress").update(progressRecordId, data);
    } catch {
        useAlertStore().showAlert(i18n.global.t("errorMsg.failedToUpdateCourseStatus"), "fail");
    }
};
