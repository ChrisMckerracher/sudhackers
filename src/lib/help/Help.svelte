<script>
    import List from "../terminal/lib/list/List.svelte";
    import TextGenerator from "../text/TextGenerator.svelte";
    import {createEventDispatcher} from "svelte";
    import HelpEntity from "../entity/helpEntity.js";

    export let defaultMessage;

    let dispatch = createEventDispatcher();

    let instructions = [
        HelpEntity.construct({
            name: "rp",
            description: "Initiate an arbitrary RP command",
        }),
        HelpEntity.construct({
            name: "search",
            description: "Search for specific data",
            location: "search location {\"building\", \"block\", \"intersection\"} {locationName}",
            creature: "search creature name {name}\n\t" +
                "search creature species {speciesName}",
            email: "search email {email} \n\t"
        }),
        HelpEntity.construct({
            name: "hack",
            description: "Hack a specific object",
        })
    ]

    function setSearch(event) {
        dispatch("return", event);
    }

</script>

{#if defaultMessage}
    {defaultMessage}
{/if}

<List on:return={setSearch} items={instructions}></List>
