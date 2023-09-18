<script>
    import TextGenerator from "../text/TextGenerator.svelte";
    import {onMount} from "svelte";
    import Fields from "./lib/fields/Fields.svelte";
    import {eventStore, initalizeEventStore} from "../event/store.js";
    import Event from "../event/event.js";
    import InputBox from "./lib/input/InputBox.svelte";


    export let info;
    let displayFields = false;

    if (info == null || info.title == null) {
        info = {
            "title": "Undefined",
            "fields": []
        }
    }

    eventStore.subscribe(async event => {
        console.log(event);
        let fields = event.fields;
        let type;
        console.log(event.type);
        switch (event.type) {
            case Event.Types.INFO_SEARCH:
                info.title = "Loading";
                info.fields = [];
                displayFields = false;
                break;
            case Event.Types.INFO_UPDATE:
                info.title = event.fields.type;
                info.fields = event.fields;
                displayFields = true;
                break;
        }
    });
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

    <Fields displayFields={displayFields} fields={info.fields}></Fields>
    <InputBox></InputBox>

</div>