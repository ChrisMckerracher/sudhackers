<script>
    import {onDestroy, onMount} from "svelte";
    import TextGenerator from "../../../text/TextGenerator.svelte";
    import Fields from "../../../terminal/lib/fields/Fields.svelte";

    import {createEventDispatcher} from 'svelte';
    import Event from "../../../event/event.js";
    import {HTTPSERVER} from "../../../util/constants.js";
    import {updateEvent} from "../../../event/store.js";

    const dispatch = createEventDispatcher();

    export let item;
    let displayFields = false;

    let activeItem = 0;

    let keyPressDisabled = false;
    addEventListener("keydown", handleInput);

    async function handleInput(event) {
        length = Object.keys(item).length + item.toggleable.length - 1;
        await disableKeyPress();
        let key = event.key;
        switch (key) {

            case 'ArrowLeft':
                displayFields = false;
                dispatch("return", {});
                break;

            case 'ArrowUp':
                activeItem--;
                if (activeItem < 0) {
                    activeItem = 0;
                }
                break

            case "ArrowDown":
                activeItem++;
                if (activeItem >= length) {
                    activeItem = length - 1;
                }
                break;

            case "Enter":
                if (item.toggle(activeItem - 3)) {
                    dispatch("itemUpdate", item);
                    await genLines();
                }
                break;
        }
    }

    let lines = [];

    onMount(async () => {
            await genLines();
        }
    )

    onDestroy(() => {
        removeEventListener("keydown", handleInput);
    })

    async function toggleActiveItemIfPossible() {
        return;
    }

    async function disableKeyPress() {
        keyPressDisabled = true;
        await new Promise(r => setTimeout(r, 25));
        keyPressDisabled = false;
    }

    function* textGenerator(txt) {
        for (let i = 0; i < txt.length; i++) {
            let field = txt[i];
            if (field === "toggleable") {
                continue
            }
            if (item[field] == "" || item[field] == null) {
                continue;
            } else {
                yield txt[i];
            }
        }
    }

    async function genLines() {
        lines = []

        if (!item) {
            return;
        }
        let keys = item.keys;
        let textGen = textGenerator(keys);

        let textLine;
        while ((textLine = textGen.next()).done != true) {
            let key = textLine.value
            let value = item[key];
            lines.push([key + ": " + value, value]);
            lines = lines;
            await new Promise(resolve => setTimeout(resolve, 100));

            let log = document.getElementById("log");
            log.scrollTop = log.scrollHeight;
        }


        item.toggleable.forEach(toggleableItem => {
            lines.push([toggleableItem.name + ": " + generateBox(toggleableItem.value), toggleableItem.value]);
            lines = lines;
            let log = document.getElementById("log");
            log.scrollTop = log.scrollHeight;
        })


    }

    function generateBox(value) {
        if (typeof (value) === "boolean") {
            return value ? "[x]" : "[ ]"
        }
        return value
    }

</script>

{#each lines as line, index}
    <div class="field">
        <TextGenerator text={line[0]} highlight={index == activeItem}
                       showCursor={false}></TextGenerator>

    </div>
{/each}


