<script>
    import TextGenerator from "../text/TextGenerator.svelte";
    import {onMount} from "svelte";

    let lines = [
        "struct NetworkMutex(x,y) {",
        "&nbsp;&nbsp;&nbsp;&nbsp;define syntaxHighlight(x,b);",
        "&nbsp;&nbsp;&nbsp;&nbsp;load.elite.structure();",
        "&nbsp;&nbsp;&nbsp;&nbsp;struct.direction = -180;",
        "&nbsp;&nbsp;&nbsp;&nbsp;factorFive = struct.direction mod 72;",
        "}",
        "NetworkMutex(ip_address, mac_address);",
        "verify(privilege_escalation);",
        "Loading..."
    ]

    let printedLines = [];

    function* itemGenerator(items) {
        for (let i = 0; i < items.length; i++) {
            yield i
        }
    }

    let itemGen = itemGenerator(lines);

    onMount(async () => {
        genLine();
    })

    let isDone = false;

    function genLine() {
        console.log("getting line");

        if (isDone) {
            return;
        }

        let textLine = itemGen.next()

        if (textLine.done != true) {
            let key = textLine.value;
            let value = lines[key];
            printedLines.push(value);
            printedLines = printedLines;
        } else {
            isDone = true;
        }

        console.log(printedLines);
    }
</script>

<style>
    .hack-line {

    }
</style>

{#each printedLines as line}
    <div class="hack-line">
        <TextGenerator on:complete={genLine} text={line} showCursor={false}></TextGenerator>
    </div>
{/each}