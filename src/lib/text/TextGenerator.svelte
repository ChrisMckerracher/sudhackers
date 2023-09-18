<script>

    import {onMount, tick} from "svelte";

    export let text;
    export let showCursor;

    let viewableText = ""
    let isDone = false;

    function* textGenerator(txt) {
        for (let i = 0; i < txt.length; i++) {
            yield txt[i];
        }
    }

    const textGen = textGenerator(text);

    onMount(async () => {
            let textLine;
            while ((textLine = textGen.next()).done != true) {
                viewableText = viewableText + textLine.value;
                await new Promise(resolve => setTimeout(resolve, 20));
            }


            isDone = true;
        }
    )

</script>
<style>

    .flashing-cursor {
        margin: 2px;
        border: 2px solid #536157; /* Cursor style (you can adjust the width and color) */
        width: 2px;
        height: 0.8em; /* Adjust the height as needed */
        animation: blink 1.2s infinite; /* Blink animation */
    }

    @keyframes blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }

    span {
        display: inline-block;
        width: 10px;
    }

    .text {
        display: flex;
        flex-direction: column-reverse;
    }

</style>

<div class="whatever">
    {viewableText}

    {#if showCursor && isDone}
        <span class="flashing-cursor">    </span>
    {/if}
</div>