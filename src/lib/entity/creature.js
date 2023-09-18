import Entity from "./field.js";

class Creature extends Entity {
    constructor(name,
                species,
                physicalTraits,
                behavior,
                intelligence,
                knownAbilities,
                history,
                ) {
        super(name, "Creature");
        this.species = species;
        this.physicalTraits = physicalTraits;
        this.behavior = behavior;
        this.intelligence = intelligence;
        this.knownAbilities = knownAbilities;
        this.history = history;
    }

    get keySort() {
        return [
            "name",
            "species",
            "physicalTraits",
            "behavior",
            "intelligence",
            "knownAbilities",
            "history",
        ]
    }
}

export default Creature;