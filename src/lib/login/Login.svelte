<script>
    import InputBox from "../terminal/lib/input/InputBox.svelte";
    import {sleep} from "../util/util.js";
    import {SERVERURL} from "../util/constants.js";
    import {createEventDispatcher} from "svelte";
    import TextGenerator from "../text/TextGenerator.svelte";

    //ToDo: enum ?
    let state = "Login";

    let dispatch = createEventDispatcher();

    async function login(event) {
        let success = false;
        let userName = event.detail;
        console.log(userName);

        state = "Logging in";
        console.log(document.getElementById("login").children[0].style.lineHeight = "150px");

        await fetch(SERVERURL + "/login", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: userName
                })
            }
        ).then(response => {
            if (response.status === 200) {
                success = true;
            }
        });
        await sleep(500);
        if (success) {
            dispatch("login", {});

        } else {
            state = "Login Failed";
            await sleep(2000);
            state = "Login";
            console.log(document.getElementById("login").children[0].style.lineHeight = "1.5");
        }
    }
</script>

<style>

    #login {
        box-sizing: border-box;
        height: 150px;
        width: 500px;
    }

    #login > .title {
        line-height: 2;
        transition: line-height 0ms linear;
    }

    #username {
        box-sizing: border-box;
        position: absolute;
        bottom: 30px;
        display: flex;
        flex-direction: row;
        width: 90%;
        padding-right: 250px;
        height: 50%;
    }

    #username > div {
        bottom: 0.3rem;
    }

    #username-heading {
        position: absolute;
        left: 0;
        line-height: 2.5rem;
        text-align: start;
        width: 20%;
    }

    #username-input {
        position: absolute;
        left: 100px;
        width: 77%;
        min-height: 65%;
    }


</style>
<div id="login" class="ui-element flex-col">
    <div class="title">
        {state}
    </div>
    {#if state == "Login"}
        <div id="username">
            <div id="username-heading">Username</div>
            <div id="username-input">
                <InputBox on:submit={login}></InputBox>
            </div>
        </div>
    {:else}
    {/if}
</div>