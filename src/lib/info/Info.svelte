<script>
    import TextGenerator from "../text/TextGenerator.svelte";
    import {onDestroy, onMount} from "svelte";
    import Fields from "./lib/fields/Fields.svelte";
    import {eventStore, initalizeEventStore} from "../event/store.js";
    import Event from "../event/event.js";
    import InputBox from "./lib/input/InputBox.svelte";
    import List from "./lib/list/List.svelte";
    import ListItem from "./lib/list/lib/listItem.js";
    import Email from "../entity/email.js";
    import SearchEngine from "../searchEngine/searchEngine.js";


    export let info;
    let displayFields = false;

    let mode = "list"; // = "display"

    const searchEngine = new SearchEngine();

    if (info == null || info.title == null) {
        info = {
            "title": "Undefined",
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
                info.title = event.fields.type;
                info.fields = event.fields;

                switch (info.title) {
                    case "Creature":
                        mode = "field"
                        break;
                    case "Emails":
                        mode = "list"
                        break
                    case "Location":
                        mode = "field";
                        break;
                    default:
                        mode = "field";
                }
                displayFields = true;
                break;
        }
    });

    let listItems = [ new Email("",
            "Re: Re: How are you today?",
            "superboy@gmail.com",
            "chrismckerracher@github.com",
            "hi friend, it's been a while. nice catching up!"
        ),
        new Email("",
            "Re: How are you today?",
            "chrismckerracher@github.com",
            "superboy@gmail.com",
            "hi friend, it's been a while. nice catching up!"
        ),
        new Email("",
            " How are you today?",
            "superboy@gmail.com",
            "chrismckerracher@github.com",
            "hi friend, it's been a while. nice catching up!"
        ),
    ]

    onDestroy(subscribe);

    async function runSearch(event) {
        let fields = event.fields;
        await searchEngine.search(fields);

    }

    listItems.map(x => console.log(JSON.stringify(x)))
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

    {#if mode == "list"}
        <List items={listItems}></List>
    {:else}
        <Fields displayFields={displayFields} fields={info.fields}></Fields>
        <InputBox></InputBox>
    {/if}

</div>