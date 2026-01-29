import customize from "./customize.json" with { type: "json" };

export default {
    plugins: {
        "@tailwindcss/postcss": {},
        "postcss-pxtorem": {
            propList: ["*"],
        },
        "postcss-simple-vars": {
            variables: customize.colors,
        },
    },
};
