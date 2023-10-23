import Entity from "./field.js";

class Hackable extends Entity {
    constructor(name, controlling, toggleable, owning_organization) {
        super(name, "hack");
        this.controlling = controlling;
        // This needs to be a map why the fuck didnt i write this in fucking type script?
        this.toggleable = toggleable;
        this.owning_organization = owning_organization;
    }
    get keySort() {
        return [
            "name",
            "owning_organization",
            "controlling",
            "toggleable",
        ]
    }

    toggle(index) {
        let toggleable = this.toggleable[index]
        console.log(name);
        console.log(this.toggleable);
        console.log(toggleable);
        toggleable.value = !toggleable.value;
    }

    get text() {
        return this.name;
    }
}

export default Hackable