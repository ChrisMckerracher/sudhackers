class Entity {
    constructor(name,
                type,
    ) {
        this.name = name;
        this.type = type;
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
        return [
            "name",
        ]
    }
}

export default Entity;