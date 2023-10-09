import {eventStore, updateEvent} from "../event/store.js";
import Event from "../event/event.js";
import EntityLoader from "../entity/entityLoader.js";
import {SERVERURL} from "../util/constants.js";


class HackEngine {

    constructor() {
        this.isLoading = false;
    }

    async hack(fields) {
        this.isLoading = true;
        let value = {}
        // fake delay
        await new Promise(r => setTimeout(r, 5000));
        await fetch(SERVERURL + "/hack",
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
                response.values = response.values.map(x => EntityLoader.load(x.type, x));
                return response;
            }).then(response => {
                updateEvent(new Event(Event.Types.HACK_UPDATE, response))
                value = response;
            });

        return value;
        this.isLoading = false;
    }

}

export default HackEngine

