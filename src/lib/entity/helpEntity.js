import Entity from "./field.js";

class HelpEntity extends Entity {

    static construct(dict) {
        return Object.assign(new HelpEntity(), dict);
    }

    constructor(name) {
        super(name, "help");

    }

    get text() {
        return this.name;
    }

    get keySort() {
        let keys = Object.keys(this);
        keys.splice(keys.indexOf("name"), 1);
        keys.splice(keys.indexOf("description"), 1);
        console.log(keys);
        return ["name", "description", ...keys]
    }
}

export default HelpEntity