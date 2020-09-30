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
        umdName: "mstDoublyLinkedList",
        external: ["mobx", "mobx-state-tree"],
    })

export default [
    config("mst-doubly-linked-list.js", "cjs", "development"),
    config("mst-doubly-linked-list.min.js", "cjs", "production"),

    config("mst-doubly-linked-list.umd.js", "umd", "development"),
    config("mst-doubly-linked-list.umd.min.js", "umd", "production"),

    config("mst-doubly-linked-list.module.js", "es", "development"),
]