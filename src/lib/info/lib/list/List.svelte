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
    console.log(items);

    onMount(async () => {
            await genLines();
        }
    )

    async function genLines() {
        let textGen = itemGenerator(items);

        let textLine;
        while ((textLine = textGen.next()).done != true) {
            let key = textLine.value
            let value = items[key];
            lines.push(value.text);
            lines = lines;
            await new Promise(resolve => setTimeout(resolve, 100));
        }

    }
</script>
<style>
    .fields {
        text-align: left;
        margin-left: 50px;
        margin-top: 100px;
        width: 100%;
    }

    .field {
        display: flex;
        padding-bottom: 20px;
    }

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

<div class="fields">
    {#if displayFields}
        <Fields displayFields={displayFields} fields={items[activeItem]}></Fields>
    {:else}
        {#each lines as line, index}
            <div class="field">
                <TextGenerator text={line} highlight={index == activeItem}
                               showCursor={false}></TextGenerator>
                {#if index == activeItem}
                    <span class="selected-field"> &nbsp;></span>
                {/if}
            </div>
        {/each}
    {/if}


</div>
