import SocketEventEngine from "../socketEventEngine/socketEventEngine.js";
import Event from "../event/event.js";
import ErrorEntity from "../entity/error.js";
import Roleplay from "../entity/roleplay.js";
import {updateEvent} from "../event/store.js";

class RpEngine {

    constructor() {
        this.wsEngine = new SocketEventEngine();
        this.isLoading = false;
        this.resolution = null;

        this.resolve = this.resolve.bind(this);
    }

    async initiate(fields) {
        let results = [new ErrorEntity("no results", "unable to find any results")];
        this.isLoading = true;

        await this.wsEngine.register(Event.Types.RP_RESPONSE, this.resolve);
        await this.wsEngine.request(Event.Types.RP_REQUEST, fields);
        let returnValue = await new Promise(res => {
            this.resolution = res;
        })

        this.resolution = null;
        await this.wsEngine.deregister(Event.Types.RP_REQUEST);
        console.log(returnValue);

        this.isLoading = false;

        if ("response" in returnValue) {
            results = returnValue.response.map(x => Object.assign(new Roleplay(), x))
        }

        updateEvent(new Event(Event.Types.RP_RESPONSE, {
            response: results
        }))
        return results;
    }

    async resolve(value) {
        if (this.resolution) {
            this.resolution(value)
        }
    }

    async destroy() {
        await this.wsEngine.disconnect();
    }

}

export default RpEngine;