import Creature from "../entity/creature.js";

class RpEngine {

    constructor(wsEngine) {
        this.wsEngine = wsEngine;
        this.isLoading = false;
    }

    async initiate(fields) {
        this.isLoading = true;
        this.isLoading = false;
        return [
            new Creature(
                "name1",
                "species",
                "physicalTraits",
                "behavior",
                "intelligence",
                "knownAbilities",
                "history",
            ), new Creature(
                "name2",
                "species",
                "physicalTraits",
                "behavior",
                "intelligence",
                "knownAbilities",
                "history",
            )
        ]
    }

}

export default RpEngine;