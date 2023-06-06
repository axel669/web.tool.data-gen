<script>
    import {
        Button,
        Text,
        Titlebar,
        Screen,
        Paper,
        EntryButton,
        Icon,

        Flex,
        Grid,

        wsx,
    } from "@axel669/zephyr"
    import * as falso from "@ngneat/falso"

    import CodeMirror from "codemirror"
    import "codemirror/lib/codemirror.css"
    import "codemirror/keymap/sublime.js"

    import "codemirror/theme/the-matrix.css"
    import "codemirror/mode/javascript/javascript.js"

    import { onMount } from "svelte"

    import * as dataGenerators from "./data-gen/generators.mjs"

    import Help from "$/help"

    let input = {
        container: null,
        editor: null,
    }
    let data = {
        container: null,
        editor: null,
    }
    onMount(
        () => {
            input.editor = CodeMirror(
                input.container,
                {
                    lineNumbers: true,
                    keyMap: "sublime",
                    theme: "the-matrix",
                    mode: "javascript",
                }
            )
            input.editor.setSize("100%", "100%")
            data.editor = CodeMirror(
                data.container,
                {
                    lineNumbers: true,
                    keyMap: "sublime",
                    theme: "the-matrix",
                    mode: "javascript",
                    readOnly: true,
                    folderGutter: true,
                }
            )
            data.editor.setSize("100%", "100%")
            input.editor.on(
                "change",
                () => localStorage.lastCode = input.editor.getValue()
            )
            requestAnimationFrame(
                () => input.editor.setValue(localStorage.lastCode ?? "")
            )
        }
    )

    const generateData = () => {
        const genCode = input.editor.getValue()
        const code = `
            ${Object.keys(dataGenerators).map(
                name => [
                    `const $${name} = gens.${name}`,
                    `const ${name} = (...args) => () => $${name}(...args)`
                ].join("\n ")
            ).join("\n")}
            const falso = {
                ${Object.keys(falso).map(
                    name => `${name}: (...args) => () => $falso.${name}(...args)`
                ).join(",\n")}
            }
            ${genCode}
        `
        const f = new Function("gens", "$falso", code)
        const generated = f(dataGenerators, falso)()
        data.editor.setValue(
            JSON.stringify(generated, null, 2) ?? "undefined"
        )
    }

    const copy = async () => {
        await navigator.clipboard.writeText(
            data.editor.getValue()
        )
    }
</script>

<svelte:head>
    <title>Mock Data Generator</title>
</svelte:head>

<svelte:body use:wsx={{ theme: "tron", "@app": true }} />

<Screen width="100%">
    <Paper square scrollable={false}
    layout={Grid}
    l-cols="1fr" l-rows="1fr min-content 1fr"
    l-p="0px">
        <Titlebar slot="header" bg="#006600" b-b-c="#00ff00">
            <Text slot="title" title>
                JSON Data Generator
            </Text>

            <EntryButton slot="menu" component={Help}>
                <Icon name="help-hexagon" />
            </EntryButton>
        </Titlebar>

        <div ws-x="w[100%] h[100%] grid over[hidden]" bind:this={input.container} />

        <Grid cols="1fr 1fr">
            {#if input.editor !== null}
                <Button on:click={generateData} color="primary" outline>
                    Generate
                </Button>
                <Button on:click={copy} color="primary" outline>
                    Copy
                </Button>
            {/if}
        </Grid>

        <div ws-x="w[100%] h[100%] grid over[hidden]" bind:this={data.container} />
    </Paper>
</Screen>
