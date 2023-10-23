class Roleplay extends Entity {
    constructor(name, props) {
        super(name, "rpResponse");
        for (let key in props) {
            this[key] = props[key];
        }

    }
}

export default Roleplay;