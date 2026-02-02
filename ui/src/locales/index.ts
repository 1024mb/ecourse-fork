export const locales = {
    "en-US": () => import("./en-US.json", {
        assert: {
            type: "json",
        },
    }),
    "en": () => import("./en-US.json", {
        assert: {
            type: "json",
        },
    }),
    "es-419": () => import("./es-419.json", {
        assert: {
            type: "json",
        },
    }),
    "es": () => import("./es-419.json", {
        assert: {
            type: "json",
        },
    }),
    "fr": () => import("./fr.json", {
        assert: {
            type: "json",
        },
    }),
    "it": () => import("./it.json", {
        assert: {
            type: "json",
        },
    }),
    "ro": () => import("./ro.json", {
        assert: {
            type: "json",
        },
    }),
};


export const availableLocales = Object.keys(locales);
