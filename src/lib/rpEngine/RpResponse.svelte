<script>
    import List from "../terminal/lib/list/List.svelte";
    import TextGenerator from "../text/TextGenerator.svelte";
    import RpEngine from "./rpEngine.js";
    import {createEventDispatcher, onMount, tick} from "svelte";

    export let fields;

    let dispatch = createEventDispatcher();

    let rpEngine = new RpEngine(null);
    let results = []

    onMount(async () => {
        rpEngine.isLoading = true;
        await tick();
        results = await rpEngine.initiate(fields);
        await tick();
        rpEngine = rpEngine;
        console.log(rpEngine);
        console.log(results);

    })


    function setSearch(event) {
        dispatch("return", event);
    }


</script>


{#if !rpEngine.isLoading}
    <List on:return={setSearch} items={results}></List>
{:else}
    <TextGenerator text="Losading..."></TextGenerator>
{/if}