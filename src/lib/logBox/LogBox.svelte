<script>
    import TextGenerator from "../text/TextGenerator.svelte";
    import {onMount} from "svelte";
    import {eventStore} from "../event/store.js";
    import Event from "../event/event.js";

    let lines = ["Loading..."];

    eventStore.subscribe(async event => {
        let fields = event.fields;
        let type;
        switch (event.type) {
            case Event.Types.INFO_SEARCH:
                type = fields.type;
                if (type == "creature") {
                    let searchType = fields.name != "" ? "name" : "species"
                    let searchField = fields.name != "" ? fields.name : fields.species;
                    lines.push("Searching creature with " + searchType + ": " + searchField);
                } else if (type == "email") {
                    lines.push("Searching email with address: " + fields.name);
                }
                break
            case Event.Types.INFO_UPDATE:
                type = fields.type;
                switch (type) {
                    case "creature":
                        let searchType = fields.name != "" ? "name" : "species"
                        let searchField = fields.name != "" ? fields.name : fields.species;
                        lines.push("Loading creature with " + searchType + ": " + searchField);
                        break;
                    case "email":
                        lines.push("Loading email with address " + fields.name);
                        break;

                }
                break;
            case Event.Types.MAP_INITIALIZE:
                lines.push("Loading Map for " + fields.locationType + ": " + fields.name);
                break;
            case Event.Types.MAP_UPDATE:
                lines.push("Loaded Map for " + fields.locationType + ": " + fields.name);
                break;
            case Event.Types.MAP_SEARCH:
                lines.push("Searching Map for " + fields.locationType + ": " + fields.name);
            case Event.Types.LOG_UPDATE:
                break;
            case Event.Types.HACK_SUCCESS:
                lines.push("Hack successful for " + fields.name);
                break;
            case Event.Types.HACK_UPDATE:
                lines.push("Updating hackable item for " + fields.name);
                break;
            case Event.Types.HACK_ATTEMPT:
                lines.push("Attempting hack of " + fields.name);
                break;
            case Event.Types.RP_REQUEST:
                lines.push("Making specific roleplay request");
                break;
            case Event.Types.RP_RESPONSE:
                lines.push("Received roleplay response ");
                break;


            default:

                break;
        }

        lines = lines;
        let log = document.getElementById("log");
        if (log == null) {
            return;
        }
        log.scrollTop = log.scrollHeight;
    })


    onMount(async () => {
        }
    )

</script>

<style>
    #text-container {
        width: calc(500px);
        height: calc(100vh - 510px);
        padding: 0px;
        bottom: 0px;
        right: 0px;
        margin-top: 0px;
        margin-right: 1px;
    }

    #text-container > div {
        padding: 10px;
    }

    span {
        display: inline-block;
        width: 10px;
    }

    .text {
        display: flex;
        flex-direction: column;
        text-align: left;
        overflow: scroll;
        height: 80%;

    }
</style>

<div class="ui-element" id="text-container">
    Log
    <div id="log" class="text">
        {#each lines as line, index}
            <TextGenerator text={line} showCursor={index == lines.length - 1}></TextGenerator>
        {/each}
    </div>
</div>