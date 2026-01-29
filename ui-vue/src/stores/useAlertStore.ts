type AlertStore = {
    show: boolean
    message: string
    type: "success" | "fail"
    timeoutEnabled: boolean
    timeout: ReturnType<typeof setTimeout> | null
}

export const useAlertStore = defineStore("alert", {
    state: (): AlertStore => ({
        show: false,
        message: "",
        type: "success",
        timeoutEnabled: true,
        timeout: null,
    }),
    actions: {
        showAlert(msg: string, alertType: "success" | "fail") {
            this.show = true;
            this.message = msg;
            this.type = alertType;

            if (this.timeoutEnabled) {
                this.timeoutEnabled = false;
                this.timeout = setTimeout(() => {
                    this.show = false;
                    this.message = "";
                    this.type = "success";
                    this.timeoutEnabled = true;
                }, 5000);
            }
        },
        closeAlert() {
            this.show = false;
            this.message = "";
            this.type = "success";
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeoutEnabled = true;
        },
    },
});
