<script>
    import HackEngine from "./hackEngine.js";
    import FakeHack from "./FakeHack.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import {updateEvent} from "../event/store.js";
    import Event from "../event/event.js";
    import ErrorEntity from "../entity/error.js";

    const dispatch = createEventDispatcher();

    export let hackItem;
    let hackEngine = new HackEngine();
    let hackObject = {}

    let result = {}

    onMount(async () => {
        hackObject = hackEngine.hack({
            "name": "hackItem"
        });
        hackEngine = hackEngine;
        console.log(hackObject);
        updateEvent(new Event(Event.Types.HACK_UPDATE, hackObject))
    });

    async function runHack(fields) {
        // This is kind of insane cuz this only works due to searchEngine.search setting isLoading to true before a tick can happen
        // so i SHOULDNT do this
        hackEngine = hackEngine
        let hackResult = await hackEngine.hack(fields);
        let results = hackResult.values;
        if (results.length == 0) {
            result = [new ErrorEntity("no results", "unable to find any results")];
            return;
        }

        // There shouldn't ever be more than one element but it could hypothetically happen
        // due to admin error.
        result = results[0];

        hackEngine = hackEngine
    }

    function setSearch(event) {
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

    {/if}
</div>