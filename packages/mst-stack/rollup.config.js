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
        umdName: "mstStack",
        external: ["mobx", "mobx-state-tree", "@mst-ds/mst-linked-list"],
    })

export default [
    config("mst-stack.js", "cjs", "development"),
    config("mst-stack.min.js", "cjs", "production"),

    config("mst-stack.umd.js", "umd", "development"),
    config("mst-stack.umd.min.js", "umd", "production"),

    config("mst-stack.module.js", "es", "development"),
]