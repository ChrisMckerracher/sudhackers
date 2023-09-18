<script>
    import {onMount} from "svelte";
    import TextGenerator from "../../../text/TextGenerator.svelte";
    import Creature from "../../../entity/creature.js";

    export let fields;
    export let displayFields;

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

    let lines = []

    onMount(async () => {
            await genLines();
        }
    )

    async function genLines() {
        console.log(fields);
        let textGen = textGenerator(fields.keys);

        let textLine;
        while ((textLine = textGen.next()).done != true) {
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
    .fields {
        text-align: left;
        margin-left: 50px;
        margin-top: 20px;
        width: 100%;
    }

    .field {
        padding-bottom: 20px;
    }
</style>

<div class="fields">
    {#if displayFields}
        {#each lines as line, index}
            <div class="field">
                <TextGenerator text={line} showCursor={index == lines.length - 1}></TextGenerator>
            </div>

        {/each}
    {/if}

</div>
