<script>

    import AutoComplete from "./lib/autoComplete.js";
    import {updateEvent} from "../../../event/store.js";
    import Event from "../../../event/event.js";
    import {onDestroy} from "svelte";

    let input = "";
    let inputKeys = [];
    let showSpace = false;
    let autoCompleteFields = [];
    let autoCompleteField = -1
    let keyPressDisabled = false;
    addEventListener("keydown", handleInput);

    onDestroy(() => {
        removeEventListener('keydown', handleInput);
    });


    function handleInput(event) {
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
            autoCompleteFields = AutoComplete.getOptions(inputKeys);
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

            triggerSearch(input);

            autoCompleteField = -1;
        } else if (key.length > 1) {
            return;
        } else {
            autoCompleteField = -1;
            input += key
        }

        showSpace = input[input.length - 1] == " " && autoCompleteField == -1;
    }

    function triggerSearch(value) {
        input = "";
        value = value.trim();
        let inputKeys = value.split(" ");
        console.log(inputKeys.length);

        if (inputKeys.length == 0) {
            return;
        }

        if (inputKeys[0] == "help") {
            updateEvent(new Event(Event.Types.HELP, {
                "type": "help",
            }));

        }
        else if (inputKeys[0] == "search") {

            let searchCriteria = inputKeys[1];
            let subSearchCriteria = inputKeys[2];
            let concreteSearchParameter;
            let fields = {}

            console.log(subSearchCriteria);

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
                    console.log("Hi")
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
                    console.log(fields);
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
        else if (inputKeys[0] == "hack") {
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

        }

    }

    async function disableKeyPress() {
        keyPressDisabled = true;
        await new Promise(r => setTimeout(r, 25));
        keyPressDisabled = false;
    }

</script>

<style>
    .flashing-cursor {
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
    }

    #textBox {
        position: absolute;
        bottom: 0px;
        width: 97%;
        height: 50px;
        margin-bottom: 5px;
        border: 2px solid green; /* Green border for the thumb */
        text-align: left;
        padding: 5px;
    }

    #inputBox {
        width: 100%;
        height: 100%;
    }

    .autocomplete {
        color: gray;
    }
</style>

<div id="textBox">
    {input}
    {#if showSpace}&nbsp{/if}
    {#if autoCompleteField != -1}
        <span class="autocomplete">{autoCompleteFields[autoCompleteField]}</span>
    {/if}
    <span class="flashing-cursor"></span>
</div>