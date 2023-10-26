import Creature from "../entity/creature.js";
import SocketEventEngine from "../socketEventEngine/socketEventEngine.js";

class RpEngine {

    constructor(wsEngine) {
        new SocketEventEngine();
        this.wsEngine = wsEngine;
        this.isLoading = false;
    }

    async initiate(fields) {
        this.wsEngine
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