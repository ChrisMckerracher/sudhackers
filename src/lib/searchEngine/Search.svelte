<script>
    import List from "../terminal/lib/list/List.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import ErrorEntity from "../entity/error.js";
    import SearchEngine from "./searchEngine.js";
    import TextGenerator from "../text/TextGenerator.svelte";

    export let fields;

    let searchEngine = new SearchEngine();

    let results = [];

    onMount(async () => {
        runSearch(fields)
    })

    async function runSearch(fields) {
        // This is kind of insane cuz this only works due to searchEngine.search setting isLoading to true before a tick can happen
        // so i SHOULDNT do this
        searchEngine = searchEngine
        let searchResult = await searchEngine.search(fields);
        results = searchResult.values;
        if (results.length == 0) {
            results = [new ErrorEntity("no results", "unable to find any results")];
            return;
        }

        searchEngine = searchEngine
    }

    const dispatch = createEventDispatcher();

    function setSearch(event) {
        dispatch("return", event);
    }

</script>

{#if !searchEngine.isLoading}
    <List on:return={setSearch} items={results}></List>
{:else}
    <TextGenerator text="Losading..."></TextGenerator>
{/if}