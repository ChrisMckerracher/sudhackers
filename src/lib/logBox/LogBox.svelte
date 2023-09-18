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
                    console.log(fields.species);
                    let searchType = fields.name != "" ? "name" : "species"
                    console.log(searchType);
                    let searchField = fields.name != "" ? fields.name : fields.species;
                    lines.push("Searching creature with " + searchType + ": " + searchField);
                } else if (type == "email") {
                    lines.push("Searching email with address: " + fields.name);
                }
                break
            case Event.Types.INFO_UPDATE:
                type = fields.type;
                if (type == "Creature") {
                    console.log(fields);
                    let searchType = fields.name != "" ? "name" : "species"
                    let searchField = fields.name != "" ? fields.name : fields.species;
                    lines.push("Loading creature with " + searchType + ": " + searchField);
                }
                break;
            case Event.Types.MAP_INITIALIZE:
                lines.push("Loading Map for " + fields.locationType + ": " + fields.location);
                break;
            case Event.Types.MAP_UPDATE:
                lines.push("Loaded Map for " + fields.locationType + ": " + fields.location);
                break;
            case Event.Types.MAP_SEARCH:
                lines.push("Searching Map for " + fields.locationType + ": " + fields.location);
            case Event.Types.LOG_UPDATE:
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
        position: fixed;
        width: calc(500px);
        height: calc(100vh - 510px);
        padding: 0px;
        bottom: 0px;
        right: 0px;
        background: radial-gradient(circle at center, rgba(83, 130, 114, 0.1) 100%, transparent 100%);
        border: 2px solid green; /* 2px width solid green border */
        text-align: center;
        margin-top: 0px;
        margin-right: 1px;
    }

    #text-container > div {
        padding: 10px;
    }


    .flashing-cursor {
        margin: 2px;
        border: 2px solid #536157; /* Cursor style (you can adjust the width and color) */
        width: 2px;
        height: 0.8em; /* Adjust the height as needed */
        animation: blink 1.2s infinite; /* Blink animation */
    }

    @keyframes blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
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

    #title {
        position: sticky;
    }

    /* Customize the scrollbar */
    ::-webkit-scrollbar {
        width: 15px; /* Width of the scrollbar */
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: none; /* No background color */
        border: 2px solid transparent; /* Transparent border */
    }

    /* Thumb */
    ::-webkit-scrollbar-thumb {
        height: 10px;
        background: none; /* No background color */
        border: 2px solid green; /* Green border for the thumb */
        border-radius: 0px; /* Round the corners */
        transition: none; /* Disable the shrinking animation */
    }

    /* Thumb on hover */
    ::-webkit-scrollbar-thumb:hover {
        border: 2px solid #009900; /* Darker green border on hover */
    }

    ::-webkit-scrollbar-corner {
        background-color: transparent;
    }

</style>

<div id="text-container">
    Log
    <div id="log" class="text">
        {#each lines as line, index}
            <TextGenerator text={line} showCursor={index == lines.length - 1}></TextGenerator>

        {/each}

    </div>


</div>