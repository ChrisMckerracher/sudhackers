import {eventStore, updateEvent} from "../event/store.js";
import Event from "../event/event.js";
import EntityLoader from "../entity/entityLoader.js";


class SearchEngine {

    constructor() {
        this.isLoading = false;
    }

    async search(fields) {
        console.log(fields);
        this.isLoading = true;
        // fake delay
        await new Promise(r => setTimeout(r, 1000));
        await fetch("http://localhost:8000" + "/search",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            })
            .then(response => response.json())
            .then(response => {
                response.values = response.values.map(x => EntityLoader.load(x.type, x));
                return response;
            }).then(response => {
                updateEvent(new Event(Event.Types.INFO_UPDATE, response))
            })

        this.isLoading = false;
    }

}

export default SearchEngine

