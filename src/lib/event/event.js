class Event {

    static Types = {
        MAP_UPDATE: "mapUpdate",
        MAP_INITIALIZE: "mapInitialize",
        MAP_SEARCH: "mapSearch",
        INFO_UPDATE: "infoUpdate",
        INFO_SEARCH: "infoSearch",
        HACK_ATTEMPT: "hackAttempt",
        HACK_SUCCESS: "hackSuccess",
        HACK_UPDATE: "hackUpdate",
        RP_REQUEST: "rpRequest",
        RP_RESPONSE: "rpResponse",
        LOG_UPDATE: "logUpdate",
        HELP: "help",
        INPUT_ERROR: "inputError"
    }
    constructor(type, fields) {
        this.type = type;
        this.fields = fields;
    }
}

export default Event;