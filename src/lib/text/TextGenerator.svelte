<script>

    const dispatch = createEventDispatcher();


    import {createEventDispatcher, onMount, tick} from "svelte";

    export let text;
    export let showCursor = false;
    export let highlight = false;

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
            dispatch("complete", {});
        }
    )

</script>
<style>
    span {
        display: inline-block;
        width: 10px;
    }

    .whatever {
        height: fit-content;
        width: fit-content;
    }

    .highlight-value {
        padding: 5px;
        padding-left: 2px;
        background-color: green;
    }

    .disabled {
        display: none;
    }


</style>

<div class="whatever {highlight  ? 'highlight-value' : ''}">
    {@html viewableText}

    {#if showCursor && isDone}
        <span class="flashing-cursor">    </span>
    {/if}
</div>

<div class="highlight-value disabled"></div>