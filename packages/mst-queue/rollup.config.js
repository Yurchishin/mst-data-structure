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
        umdName: "mstQueue",
        external: ["mobx", "mobx-state-tree", "@mst-ds/mst-linked-list"],
    })

export default [
    config("mst-queue.js", "cjs", "development"),
    config("mst-queue.min.js", "cjs", "production"),

    config("mst-queue.umd.js", "umd", "development"),
    config("mst-queue.umd.min.js", "umd", "production"),

    config("mst-queue.module.js", "es", "development"),
]