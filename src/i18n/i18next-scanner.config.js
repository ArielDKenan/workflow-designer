module.exports = {
    options: {
        debug: true,
        func: {
            list: ["i18next.t", "i18n.t"],
            extensions: [".js", ".jsx"]
        },
        trans: {
            extensions: [".js", ".jsx"],
            fallbackKey: (ns, value) => {
                return value;
            }
        },
        lngs: ["en", "de"],
        ns: ["locale", "resource"],
        defaultNs: "resource",
        defaultValue: "__STRING_NOT_TRANSLATED__",
        resource: {
            loadPath: "i18n/{{lng}}/{{ns}}.json",
            savePath: "i18n/{{lng}}/{{ns}}.json"
        },
        nsSeparator: false, // namespace separator
        keySeparator: false, // key separator
        interpolation: {
            prefix: "{{",
            suffix: "}}"
        }
    }
};
