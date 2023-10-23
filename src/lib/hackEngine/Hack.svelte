<script>
    import HackEngine from "./lib/hackEngine.js";
    import FakeHack from "./FakeHack.svelte";
    import {createEventDispatcher, onDestroy, onMount} from "svelte";
    import {eventStore, updateEvent} from "../event/store.js";
    import Event from "../event/event.js";
    import ErrorEntity from "../entity/error.js";
    import SelectableField from "./lib/list/SelectableField.svelte";

    const dispatch = createEventDispatcher();

    export let hackItem;
    let hackEngine = new HackEngine();
    let hackObject = {}

    let result = {}

    const subscribe = eventStore.subscribe(async event => {
        let fields = event.fields;
        let type;
        switch (event.type) {
            case Event.Types.HACK_SUCCESS:
                hackObject = event.fields;
                console.log(hackObject);
                console.log(Object.keys(hackObject))
                break;
            default:
                hackObject = {};
                break;
        }
    });

    onMount(async () => {
        //await attemptHack({
        //    name: hackItem
        //})
        hackEngine = hackEngine;
        //updateEvent(new Event(Event.Types.HACK_UPDATE, hackObject));
    });

    onDestroy(subscribe);

    async function attemptHack(fields) {
        hackEngine = hackEngine
        let hackResult = await hackEngine.hack(fields);
        let results = hackResult.values;
        if (results.length == 0) {
            result = [new ErrorEntity("no results", "unable to find any results")];
            return;
        }

        // There shouldn't ever be more than one element but it could hypothetically happen
        // due to admin error.
        hackObject = results[0];

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
        <SelectableField on:return={setSearch} item={hackObject}></SelectableField>
    {/if}
</div>