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
        super(name, "creature");
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

    get text() {
        return this.name;
    }
}

export default Creature;