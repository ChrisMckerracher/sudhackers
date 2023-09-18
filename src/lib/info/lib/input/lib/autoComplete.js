class AutoComplete {
    constructor() {

    }

    static getOptions(keys) {
        let searchTerm = keys[0];
        switch (searchTerm) {
            case "search":
                return AutoComplete.getSearchOptions(keys)
            case "roll":
                return AutoComplete.getRollOptions(keys)
            default:
                return []
        }
    }

    static getSearchOptions(keys) {
        if (keys.length == 1) {
            return ["creature", "location", "email"];
        } else if (keys.length == 2) {
            let searchCriteria = keys[1];

            switch (searchCriteria) {
                case "creature":
                    return ["species", "name"]
                case "location":
                    return ["building", "street", "district"]
            }
        } else if (keys.length == 3) {
            let searchCriteria = keys[1];
            let subSearchCriteria = keys[2];

            if (searchCriteria == "creature") {
                switch(subSearchCriteria) {
                    case "species":
                        return ["werewolf", "vampire", "human"]
                    case "name":
                        return ["edward.vonhufman", "johnny.pneumonic"]
                }
            }

            if (searchCriteria == "location") {
                switch (subSearchCriteria) {
                    case "building":
                        return ["kodak.building", ""]
                    case "street":
                        return ["dundas", "bloor"]
                    case "district":
                        return ["waterfront.77", "kensington.chinatown.78"]
                }
            }
        }
    }

    static getRollOptions(keys) {
        return ["4", "6", "12"]

    }

}

export default AutoComplete