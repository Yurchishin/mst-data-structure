import { baseConfig } from "../../rollup.base-config"

const config = (outFile, format, mode) =>
    baseConfig({
        outFile,
        format,
        mode,

        input: "./src/index.js",
        globals: {
            mobx: "mobx",
        },
        umdName: "mstLinkedList",
        external: ["mobx", "mobx-state-tree"],
    })

export default [
    config("mst-linked-list.js", "cjs", "development"),
    config("mst-linked-list.min.js", "cjs", "production"),

    config("mst-linked-list.umd.js", "umd", "development"),
    config("mst-linked-list.umd.min.js", "umd", "production"),

    config("mst-linked-list.module.js", "es", "development"),
]