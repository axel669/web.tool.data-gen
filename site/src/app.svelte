<script>
    import {
        Button,
        Text,
        Titlebar,
        Screen,
        Paper,

        Flex,
        Grid,

        wsx,
    } from "@axel669/zephyr"

    import { onMount } from "svelte"
    import { writable } from "svelte/store"

    import mockGen from "./data-gen/main.mjs"

    const value = writable("")

    require.config({
        paths: {
            vs: "https://unpkg.com/monaco-editor@latest/min/vs"
        }
    })

    window.MonacoEnvironment = {
        getWorkerUrl: function (workerId, label) {
            return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
            baseUrl: "https://unpkg.com/monaco-editor@latest/min/"
        }
        importScripts("https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js")`
            )}`
        }
    }

    const config = {
        value: "",
        language:"javascript",
        theme: "vs-dark",
        automaticLayout: true,
    }

    let editorContainer = null
    let editor = null
    let dataViewContainer = null
    let dataView = null
    onMount(
        () => {
            require(
                ["vs/editor/editor.main"],
                function () {
                    editor = monaco.editor.create(
                        editorContainer,
                        { ...config, value: localStorage.lastCode ?? "" }
                    )
                    dataView = monaco.editor.create(
                        dataViewContainer,
                        { ...config, language: "json", readonly: true }
                    )

                    editor.onDidChangeModelContent(
                        () => localStorage.lastCode = editor.getValue()
                    )
                }
            )
        }
    )

    const generateData = () => {
        const genCode = editor.getValue()
        const code = `
            const {${Object.keys(mockGen.generators).join(", ")}} = gens
            let items = null
            ${genCode};
            return generate(items)
        `
        const f = new Function("gens", "generate", code)
        const data = f(mockGen.generators, mockGen.generate)
        dataView.setValue(
            JSON.stringify(data, null, 2)
        )
    }
</script>

<svelte:head>
    <title>Mock Data Generator</title>
</svelte:head>

<svelte:body use:wsx={{ theme: "tron", "@app": true }} />

<Screen width="100%">
    <Paper square layout={Grid} l-cols="1fr 110px 1fr" l-rows="1fr" l-p="0px">
        <Titlebar slot="header">
            <Text slot="title" title>
                JSON Data Generator
            </Text>
        </Titlebar>

        <div ws-x="w[100%] h[100%]" bind:this={editorContainer} />

        <Flex>
            {#if editor !== null}
                <Button on:click={generateData} color="primary" fill>
                    Generate
                </Button>
            {/if}
        </Flex>

        <div ws-x="w[100%] h[100%]" bind:this={dataViewContainer} />
    </Paper>
</Screen>
