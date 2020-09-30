import { baseConfig } from "../../rollup.base-config"

const config = (outFile, format, mode) =>
    baseConfig({
        outFile,
        format,
        mode,

        input: "./src/index.js",
        globals: {
            mobx: "mobx",
            "mobx-state-tree": "mobxStateTree",
        },
        umdName: "mstJest",
        external: ["mobx", "mobx-state-tree"],
    })

export default [
    config("mst-jest.js", "cjs", "development"),
    config("mst-jest.min.js", "cjs", "production"),

    config("mst-jest.umd.js", "umd", "development"),
    config("mst-jest.umd.min.js", "umd", "production"),

    config("mst-jest.module.js", "es", "development"),
]