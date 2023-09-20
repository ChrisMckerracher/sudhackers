<script>
    import {onDestroy} from "svelte";
    import {eventStore} from "../event/store.js";
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

    .title {
        width: 100%;

    }

    .fields {
        text-align: left;
        margin-left: 50px;
        margin-top: 100px;
        width: 100%;
    }



</style>

<div id="info-container">
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
        <InputBox></InputBox>
    {/if}

</div>