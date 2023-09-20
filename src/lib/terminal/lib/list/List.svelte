<script>
    import {onDestroy, onMount} from "svelte";
    import TextGenerator from "../../../text/TextGenerator.svelte";
    import Fields from "../fields/Fields.svelte";

    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let items;
    let displayFields = false;

    let activeItem = 0;

    let keyPressDisabled = false;
    addEventListener("keydown", handleInput);

    function handleInput(event) {
        disableKeyPress();
        let key = event.key;
        if (displayFields) {
            if (key == "ArrowLeft") {
                displayFields = false;
                return;

            }
        }
        if (key == 'ArrowUp') {
            activeItem--;
            if (activeItem < 0) {
                activeItem = 0;
            }

        } else if (key == "ArrowDown") {
            activeItem++;
            if (activeItem >= items.length) {
                activeItem = items.length - 1;
            }

        } else if (key == "ArrowRight") {
            displayFields = true;

        } else if (key == "ArrowLeft") {
            dispatch("return", {})
        }
    }

    onDestroy(() => {
        removeEventListener("keydown", handleInput);
    })

    async function disableKeyPress() {
        keyPressDisabled = true;
        await new Promise(r => setTimeout(r, 25));
        keyPressDisabled = false;
    }

    function* itemGenerator(items) {
        for (let i = 0; i < items.length; i++) {
            yield i
        }
    }


    let lines = []
    let isDone = false;

    let textGen = itemGenerator(items);

    onMount(async () => {
            genLine();
        }
    )

    function genLine() {

        if (isDone) {
            return;
        }

        let textLine = textGen.next()

        if (textLine.done != true) {
            let key = textLine.value
            let value = items[key];
            lines.push(value.text);
            lines = lines;
        } else {
            isDone = true;
        }
    }

</script>
<style>

    .selected-field {
        margin: 0px;
        height: 20px;
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
</style>

{#if displayFields}
    <Fields displayFields={displayFields} fields={items[activeItem]}></Fields>
{:else}
    {#each lines as line, index}
        <div class="field">
            <TextGenerator on:complete={genLine} text={line} highlight={index == activeItem}
                           showCursor={false}></TextGenerator>
            {#if index == activeItem}
                <span class="selected-field"> &nbsp;></span>
            {/if}
        </div>
    {/each}
{/if}


