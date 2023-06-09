import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import svelte from "rollup-plugin-svelte"
import del from "rollup-plugin-delete"
import html from "@axel669/rollup-html-input"
import $path from "@axel669/rollup-dollar-path"
import copy from "@axel669/rollup-copy-static"
import css from "rollup-plugin-import-css"

export default {
    input: "src/index.html",
    output: {
        file: `build/app-d${Date.now()}.mjs`,
        format: "esm",
    },
    plugins: [
        del({
            targets: ["build/app-*.mjs", "build/index.html"]
        }),
        html(),
        $path({
            root: "src"
        }),
        svelte(),
        resolve(),
        commonjs(),
        css({
            output: "cm.css"
        }),
        copy("static"),
    ]
}
