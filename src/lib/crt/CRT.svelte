<script>
import Info from "../info/Info.svelte";
import LogBox from "../logBox/LogBox.svelte";
import Map from "../map/Map.svelte";
import {eventStore} from "../event/store.js";
import {onMount} from "svelte";
import Event from "../event/event.js";
import Creature from "../entity/creature.js";
let text = ["Loading",
    "Initializing map: Toronto",
    "Rendering UI",
    "Searching Creature: Wolf Man",
    "Found Creature: Wolf Man"
]

let isLoading = true;

onMount(async() => {
    await sleep();
    let event = new Event(Event.Types.MAP_INITIALIZE, {
        "locationType": "City",
        "location": "Toronto"
    })

    eventStore.set(event);
    await sleep();

     event = new Event(Event.Types.MAP_UPDATE, {
        "locationType": "City",
        "location": "Toronto"
    })

    eventStore.set(event);
    isLoading = false;
    await sleep();

    event = new Event(Event.Types.INFO_SEARCH, {
        "type": "creature",
        "name": "",
        "species": "werewolf"
    })
    eventStore.set(event);
    await sleep();

    event = new Event(Event.Types.INFO_UPDATE, new Creature(
        "",
        "Wolfman",
        "Strong, fur",
        "Aggressive",
        "Below Average",
        "Claws, fangs, runs fast",
        "Existed since the 1800s"

    ))
    eventStore.set(event);


})

async function sleep() {
    await new Promise(r => setTimeout(r, 1000));
}


</script>

<style>
    @import "../../app.css";
</style>

<div class="crt">
    <Info></Info>
    <LogBox></LogBox>
    <Map isLoading={isLoading}></Map>
</div>