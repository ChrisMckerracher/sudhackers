import {eventStore, updateEvent} from "../event/store.js";
import Event from "../event/event.js";
import EntityLoader from "../entity/entityLoader.js";
import {HTTPSERVER} from "../util/constants.js";


class SearchEngine {

    constructor() {
        this.isLoading = false;
    }

    async search(fields) {
        console.log(fields);
        let value = [];
        this.isLoading = true;
        // fake delay
        await new Promise(r => setTimeout(r, 1000));
        await fetch(HTTPSERVER + "/search",
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
                response.values = response.values.map(x => EntityLoader.load(fields.type, x));
                return response;
            }).then(response => {
                updateEvent(new Event(Event.Types.INFO_UPDATE, response));
                value = response;
            })

        this.isLoading = false;
        console.log(this.isLoading);
        return value;
    }

}

export default SearchEngine

