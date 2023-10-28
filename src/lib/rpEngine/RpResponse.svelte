<script>
    import List from "../terminal/lib/list/List.svelte";
    import TextGenerator from "../text/TextGenerator.svelte";
    import RpEngine from "./rpEngine.js";
    import {createEventDispatcher, onDestroy, onMount, tick} from "svelte";
    import ErrorEntity from "../entity/error.js";

    export let fields;

    let dispatch = createEventDispatcher();

    let rpEngine = new RpEngine();
    let results = []

    onMount(async () => {
        rpEngine = rpEngine;
        results = await rpEngine.initiate(fields);

        console.log(rpEngine);
        console.log(results);

    });

    onDestroy(async () => {
        await rpEngine.destroy();
    })


    function setSearch(event) {
        dispatch("return", event);
    }


</script>


{#if !rpEngine.isLoading}
    <List on:return={setSearch} items={results}></List>
{:else}
    <TextGenerator text="Loading..."></TextGenerator>
{/if}