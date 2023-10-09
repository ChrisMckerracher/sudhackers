<script>
    import {onDestroy} from "svelte";
    import {eventStore, updateEvent} from "../event/store.js";
    import Event from "../event/event.js";
    import InputBox from "./lib/input/InputBox.svelte";
    import Hack from "../hackEngine/Hack.svelte";
    import Search from "../searchEngine/Search.svelte";


    export let info;
    let displayFields = false;

    let mode = "terminal";

    if (info == null || info.title == null) {
        info = {
            "title": "Terminal",
            "fields": []
        }
    }

    const subscribe = eventStore.subscribe(async event => {
        console.log(event);
        let fields = event.fields;
        let type;
        console.log(event.type);
        switch (event.type) {
            case Event.Types.INFO_SEARCH:
                info.title = "Search";
                info.fields = event.fields;
                displayFields = false;
                mode = "search";
                break;
            case Event.Types.INFO_UPDATE:
                info.title = event.fields.type;
                break;
            case Event.Types.HACK_ATTEMPT:
                info.title = "Hacking";
                info.fields = event.fields;
                mode = "hacking";
                break;
        }
    });

    onDestroy(subscribe);

    function returnSearch(e) {
        mode = "terminal";
        info.title = "Terminal";
    }

    function triggerSearch(event) {
        let value = event.detail;
        let inputKeys = value.split(" ");
        console.log(inputKeys.length);

        if (inputKeys.length == 0) {
            return;
        }

        switch (inputKeys[0]) {
            case "help":
                updateEvent(new Event(Event.Types.HELP, {
                    "type": "help",
                }));
                break;
            case "search":
                handleSearchQuery(inputKeys);
                break;
            case "hack":
                if (inputKeys.length != 2) {

                    updateEvent(new Event(Event.Types.INPUT_ERROR, {
                        "type": "hack",
                    }));
                    return;
                }

                let hackableItem = inputKeys[1];

                updateEvent(new Event(Event.Types.HACK_ATTEMPT, {
                    "type": "hack",
                    "name": hackableItem
                }));
                break;
            default:
                updateEvent(new Event(Event.Types.INPUT_ERROR, {
                    "type": inputKeys[0],
                }));
        }
    }

    function handleSearchQuery(inputKeys) {
        //ToDo: make a fields generator class, to pass back here. this is omega ugly

        let searchCriteria = inputKeys[1];
        let subSearchCriteria = inputKeys[2];
        let concreteSearchParameter;
        let fields = {}

        switch (searchCriteria) {
            case "email":
                if (inputKeys.length != 3) {

                    updateEvent(new Event(Event.Types.INPUT_ERROR, {
                        "type": "search",
                    }));
                    return;
                }

                fields = {
                    type: "email",
                    name: subSearchCriteria
                }
                updateEvent(new Event(Event.Types.INFO_SEARCH, fields));
                break;

            case "creature":
                if (inputKeys.length != 4) {

                    updateEvent(new Event(Event.Types.INPUT_ERROR, {
                        "type": "search",
                    }));
                    return;
                }

                concreteSearchParameter = inputKeys[3];
                fields = {
                    type: "creature",
                    name: "",
                    species: ""
                }
                if (subSearchCriteria == "species") {
                    fields.species = concreteSearchParameter;
                } else if (subSearchCriteria == "name") {
                    fields.name = concreteSearchParameter;
                } else {
                    updateEvent(new Event(Event.Types.INPUT_ERROR, {
                        "type": "search",
                    }));
                    return;
                }
                updateEvent(new Event(Event.Types.INFO_SEARCH, fields));

                break;
            case "location":
                if (inputKeys.length != 4) {

                    updateEvent(new Event(Event.Types.INPUT_ERROR, {
                        "type": "search",
                    }));
                    return;
                }

                concreteSearchParameter = inputKeys[3];

                if (["building", "intersection", "district"].indexOf(subSearchCriteria) == -1) {
                    updateEvent(new Event(Event.Types.INPUT_ERROR, {
                        "type": "search",
                    }));
                    return;
                }

                fields = {
                    type: "location",
                    "locationType": subSearchCriteria,
                    "name": concreteSearchParameter
                }

                updateEvent(new Event(Event.Types.INFO_SEARCH, fields));

        }


    }

</script>

<style>
    #info-container {
        width: calc(100vw - 510px);
        height: 99.4%;
        margin-top: 1px;
        left: 0px;
    }

    span {
        display: inline-block;
        width: 10px;
    }


    .fields {
        text-align: left;
        margin-left: 50px;
        margin-top: 100px;
        width: 100%;
    }

</style>

<div class="ui-element flex-col" id="info-container">
    <div class="title">
        {info.title}
    </div>

    <div class="fields">

        {#if mode === "hacking"}
            <Hack hackItem={info.fields["name"]}></Hack>
        {:else if mode === "search"}
            <Search on:return={returnSearch} fields={info.fields}></Search>
        {/if}
    </div>

    <!-- The extra if is to make it easier to not deal with styling rather than put it above-->

    {#if mode == "terminal"}
        <InputBox on:submit={triggerSearch}></InputBox>
    {/if}

</div>