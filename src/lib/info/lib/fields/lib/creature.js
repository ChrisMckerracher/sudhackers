class Creature {
    constructor(name,
                species,
                physicalTraits,
                behavior,
                intelligence,
                knownAbilities,
                history,
                ) {
        this.type = "Creature";
        this.name = name;
        this.species = species;
        this.physicalTraits = physicalTraits;
        this.behavior = behavior;
        this.intelligence = intelligence;
        this.knownAbilities = knownAbilities;
        this.history = history;
    }

    get keys() {
        let keys = Object.keys(this);
        keys = keys.filter(x => x != "keySort" && x != "history" && x != "type");
        keys.sort((x,y) => {
            return this.keySort.indexOf(x) - this.keySort.indexOf(y);
        })
        console.log(keys);
        return keys;
    }

    get keySort() {
        console.log("gettin");
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