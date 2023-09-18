import {eventStore} from "../event/store.js";
import Event from "../event/event.js";


class SearchEngine {

    constructor() {
        this.isLoading = false;
    }

    async search(fields) {
        console.log(fields);
        this.isLoading = true;
        await fetch("http://localhost:8000" + "/search",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            })
            .then(response => resonse.json)
            .then(response => {
                let type = response.type;
                let fields = response.fields;
            })

        this.isLoading = false;
    }

}

export default SearchEngine

