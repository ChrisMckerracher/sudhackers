<script>
    import {onDestroy, onMount} from "svelte";
    import TextGenerator from "../../../text/TextGenerator.svelte";
    import {updateEvent} from "../../../event/store.js";
    import Event from "../../../event/event.js";
    import {HTTPSERVER} from "../../../util/constants.js";
    //ToDo: this component is currently hacking in hack toggles. either make a hack fields or refactor this
    // this read-only component SHOULDNT be modifying thigns and firing events
    export let item;
    export let fields;
    export let displayFields;
    let keyPressDisabled = false;

    function* textGenerator(txt) {
        for (let i = 0; i < txt.length; i++) {
            let field = txt[i];
            if (fields[field] == "" || fields[field] == null) {
                continue;
            } else {
                yield txt[i];
            }
        }
    }

    let lines = [];

    onMount(async () => {
            await genLines();
        }
    )

    async function genLines() {
        console.log(fields);
        let textGen = textGenerator(fields.keys);
        console.log(fields.keys);

        let textLine;
        while ((textLine = textGen.next()).done != true) {
            console.log(textLine);
            let key = textLine.value
            let value = fields[key];
            lines.push(key + ": " + value);
            lines = lines;
            await new Promise(resolve => setTimeout(resolve, 100));

            let log = document.getElementById("log");
            log.scrollTop = log.scrollHeight;
        }
    }
</script>
<style>

</style>

{#if displayFields}
    {#each lines as line, index}
        <div class="field">
            <TextGenerator text={line} showCursor={index == lines.length - 1}></TextGenerator>
        </div>

    {/each}
{/if}

