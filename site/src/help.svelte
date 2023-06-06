<script>
    import {
        Screen,
        Titlebar,
        Button,
        Paper,
        Text,
        Icon,
    } from "@axel669/zephyr"

    export let close
</script>

<Screen>
    <Paper square>
        <Titlebar slot="header" bg="#006600" b-b-c="#00ff00">
            <Text slot="title" title>
                Help
            </Text>

            <Button slot="menu" on:click={close}>
                <Icon name="x" />
            </Button>
        </Titlebar>

        <Text>
            Aut facere quaerat sapiente inventore libero impedit vero. Animi
            harum assumenda autem sint necessitatibus fugiat. Qui eligendi et
            ut distinctio.
        </Text>
    </Paper>
</Screen>
