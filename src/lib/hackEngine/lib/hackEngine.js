import {eventStore, updateEvent} from "../../event/store.js";
import Event from "../../event/event.js";
import EntityLoader from "../../entity/entityLoader.js";
import {HTTPSERVER} from "../../util/constants.js";


class HackEngine {

    constructor() {
        this.isLoading = false;
    }

    async attemptHack(fields) {
        this.isLoading = true;
        let value = {}
        // fake delay
        await new Promise(r => setTimeout(r, 5000));
        await fetch(HTTPSERVER + "/attemptHack",
            {
                method: 'POST',
                mode: "cors",
                cache: "no-cache",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                response.values = response.values.map(x => EntityLoader.load("hack", x));
                return response;
            }).then(response => {
                updateEvent(new Event(Event.Types.HACK_SUCCESS, response))
                value = response;
            });
        this.isLoading = false;
        return value;
    }

    async hack(hackable) {
        this.isLoading = true;
        let value = {}
        await fetch(HTTPSERVER + "/hack",
            {
                method: 'POST',
                mode: "cors",
                cache: "no-cache",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            })            .then(response => response.json())
            .then(response => {
                console.log(response);
                response.values = response.values.map(x => EntityLoader.load("hack", x));
                return response;
            }).then(response => {
                updateEvent(new Event(Event.Types.HACK_SUCCESS, response))
                value = response;
            });

        this.isLoading = false;
        return value;
    }

}

export default HackEngine

