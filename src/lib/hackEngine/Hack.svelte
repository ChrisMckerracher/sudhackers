<script>
    import HackEngine from "./lib/hackEngine.js";
    import FakeHack from "./FakeHack.svelte";
    import {createEventDispatcher, onDestroy, onMount} from "svelte";
    import {eventStore, updateEvent} from "../event/store.js";
    import Event from "../event/event.js";
    import ErrorEntity from "../entity/error.js";
    import SelectableField from "./lib/list/SelectableField.svelte";
    import List from "../terminal/lib/list/List.svelte";

    const dispatch = createEventDispatcher();

    export let hackItem;
    let hackEngine = new HackEngine();
    let hackObject = {}

    let error = false;
    let errorResult = []


    onMount(async () => {
        await attemptHack({
            name: hackItem
        })
    });


    async function attemptHack(fields) {
        console.log(hackItem)
        hackEngine = hackEngine
        let hackResult = await hackEngine.attemptHack(fields);
        console.log(hackResult);
        let results = hackResult.values;
        if (results.length == 0) {
            errorResult = [new ErrorEntity("no results", "unable to find any results")];
            error = true;
            return;
        }

        // There shouldn't ever be more than one element but it could hypothetically happen
        // due to admin error.
        hackObject = results[0];

        hackEngine = hackEngine;
        updateEvent(new Event(Event.Types.HACK_UPDATE, hackObject));
    }

    async function updateHack(value) {
        await hackEngine.hack(value.detail);
    }

    function setSearch(event) {
        console.log('here');
        dispatch("return", event);
    }

</script>

<style>

    .hack-wrapper {
        height: 100%;
        width: 100%;
        padding: 0px;
        margin: 0px;
    }
</style>

<div class="hack-wrapper">
    {#if hackEngine.isLoading}
        <FakeHack></FakeHack>
    {:else}
        {#if error}
            <List on:return={setSearch} items={errorResult}></List>
        {:else}
            <SelectableField on:itemUpdate={updateHack} on:return={setSearch} item={hackObject}></SelectableField>
        {/if}
    {/if}
</div>