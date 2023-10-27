<script>
    import Terminal from "../terminal/Terminal.svelte";
    import LogBox from "../logBox/LogBox.svelte";
    import Map from "../map/Map.svelte";
    import {eventStore} from "../event/store.js";
    import {onMount} from "svelte";
    import Event from "../event/event.js";
    import Login from "../login/Login.svelte";

    let text = ["Loading",
        "Initializing map: Toronto",
        "Rendering UI",
        "Searching Creature: Wolf Man",
        "Found Creature: Wolf Man"
    ]

    let loggedIn = false;

    let isLoading = true;

    onMount(async () => {
        await sleep();
        let event = new Event(Event.Types.MAP_INITIALIZE, {
            "locationType": "City",
            "name": "Toronto",
            "location": "Toronto"
        })

        eventStore.set(event);
        await sleep();

        event = new Event(Event.Types.MAP_UPDATE, {
            "locationType": "City",
            "name": "Toronto",
            "location": "Toronto"
        })

        eventStore.set(event);
        isLoading = false;
        await sleep();
    })

    async function sleep() {
        await new Promise(r => setTimeout(r, 1000));
    }


</script>

<style>
    @import "../../app.css";
</style>

<div class="crt flex-center">
    {#if loggedIn}
        <Terminal></Terminal>
        <LogBox></LogBox>
        <Map isLoading={isLoading}></Map>
    {:else}
        <Login on:login={() => loggedIn = true}></Login>
    {/if}
</div>