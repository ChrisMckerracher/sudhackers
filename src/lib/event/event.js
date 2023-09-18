class Event {

    static Types = {
        MAP_UPDATE: "mapUpdate",
        MAP_INITIALIZE: "mapInitialize",
        MAP_SEARCH: "mapSearch",
        INFO_UPDATE: "infoUpdate",
        INFO_SEARCH: "infoSearch",
        LOG_UPDATE: "logUpdate"
    }
    constructor(type, fields) {
        this.type = type;
        this.fields = fields;
    }
}

export default Event;