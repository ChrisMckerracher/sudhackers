import Entity from "./field.js";

class Roleplay extends Entity {
    constructor(name, props) {
        super(name, "rpResponse");
        for (let key in props) {
            this[key] = props[key];
        }
    }

    get text() {
        return this.name;
    }
}

export default Roleplay;