<script>

    import AutoComplete from "./lib/autoComplete.js";
    import {createEventDispatcher, onDestroy} from "svelte";

    let enableAutoComplete = false;
    let input = "";
    let inputKeys = [];
    let showSpace = false;
    let autoCompleteFields = [];
    let autoCompleteField = -1
    let keyPressDisabled = false;

    let dispatch = createEventDispatcher();

    addEventListener("keydown", handleInput);

    onDestroy(() => {
        removeEventListener('keydown', handleInput);
    });


    function handleInput(event) {
        //ToDo: major refactor of this
        if (keyPressDisabled) {
            return;
        }
        disableKeyPress();

        let key = event.key;

        if (key == 'Backspace') {
            input = input.slice(0, input.length - 1);
            autoCompleteField = -1;
        } else if (key == " ") {
            if (autoCompleteField > -1) {
                input += autoCompleteFields[autoCompleteField];
                autoCompleteField = -1;
            }
            inputKeys = input.split(" ");
            if (input[input.length - 1] != " ") {
                input += " "
            }
            if (enableAutoComplete) {
                autoCompleteFields = AutoComplete.getOptions(inputKeys);
            }
            if (autoCompleteFields != null && autoCompleteFields.length > 0) {
                autoCompleteField = 0;
            }
            autoCompleteField = autoCompleteField;
        } else if (key == "Tab" && input[input.length - 1] == " ") {
            if (autoCompleteField < autoCompleteFields.length) {
                autoCompleteField++;
            }
            if (autoCompleteField == autoCompleteFields.length) {
                autoCompleteField = 0;
            }
        } else if (key == "Enter") {

            submit(input);

            autoCompleteField = -1;
        } else if (key.length > 1) {
            return;
        } else {
            autoCompleteField = -1;
            input += key
        }

        showSpace = input[input.length - 1] == " " && autoCompleteField == -1;
    }

    function submit(value) {
        input = "";
        value = value.trim();
        dispatch("submit", value);
    }

    async function disableKeyPress() {
        keyPressDisabled = true;
        await new Promise(r => setTimeout(r, 5));
        keyPressDisabled = false;
    }

</script>

<style>

    span {
        display: inline-block;
    }

    #textBox {
        display: flex;
        gap: 5px;
        position: absolute;
        bottom: 0px;
        width: 97%;
        height: 50%;
        max-height: 50px;
        margin-bottom: 5px;
        border: 2px solid green; /* Green border for the thumb */
        text-align: left;
        padding: 5px;
    }

    .autocomplete {
        color: gray;
    }
</style>

<div id="textBox">
    {input}
    {#if showSpace}&nbsp{/if}
    {#if enableAutoComplete && autoCompleteField != -1}
        <span class="autocomplete">{autoCompleteFields[autoCompleteField]}</span>
    {/if}
    <span class="flashing-cursor"></span>
</div>