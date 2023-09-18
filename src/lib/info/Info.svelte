<script>
    import {onDestroy, tick} from "svelte";
    import Fields from "./lib/fields/Fields.svelte";
    import {eventStore} from "../event/store.js";
    import Event from "../event/event.js";
    import InputBox from "./lib/input/InputBox.svelte";
    import List from "./lib/list/List.svelte";
    import SearchEngine from "../searchEngine/searchEngine.js";
    import ErrorEntity from "../entity/error.js";


    export let info;
    let displayFields = false;

    let mode = ""; // = "display"

    const searchEngine = new SearchEngine();

    if (info == null || info.title == null) {
        info = {
            "title": "Loading",
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
                info.title = "Loading";
                info.fields = [];
                displayFields = false;
                runSearch(event)
                break;
            case Event.Types.INFO_UPDATE:
                console.log(event.fields);
                info.title = event.fields.type;
                info.title = info.title[0].toUpperCase() + info.title.slice(1, info.title.length)
                info.fields = event.fields.values;
                if (info.fields.length == 0) {
                    info.fields = [new ErrorEntity("no results", "unable to find any results")];
                    return;
                }

                switch (info.title) {
                    case "creature":
                        mode = "display";
                        await tick();
                        mode = "list";
                        break;
                    case "email":
                        mode = "list"
                        break
                    case "location":
                        mode = "list";
                        break;
                    default:
                        mode = "list";
                }
                displayFields = true;
                break;
        }
    });

    onDestroy(subscribe);

    async function runSearch(event) {
        let fields = event.fields;
        await searchEngine.search(fields);

    }

    function setSearch() {
        mode = "search";
        info.title = "Search";
        info.fields = [];
    }

</script>

<style>
    #info-container {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc(100vw - 510px);
        height: 99.4%;
        margin-top: 1px;
        left: 0px;
        background: radial-gradient(circle at center, rgba(83, 130, 114, 0.1) 100%, transparent 100%);
        border: 2px solid green; /* 2px width solid green border */
        text-align: center;


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

    #title {
        position: sticky;
    }

    .title {
        width: 100%;

    }


</style>

<div id="info-container">
    <div class="title">
        {info.title}
    </div>

    {#if info.fields.length > 1}
        <List on:return={setSearch} items={info.fields}></List>
    {:else if info.fields.length == 1}
        <Fields displayFields={true} fields={info.fields[0]}></Fields>
        <InputBox></InputBox>
    {:else}
        <Fields displayFields={true}
                fields={info.fields}></Fields>
        <InputBox></InputBox>
    {/if}

</div>