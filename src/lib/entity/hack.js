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

    /**
     *
     * @param index
     * @returns true if the condition toggled, otherwise false
     */
    toggle(index) {
        if (!(index in this.toggleable)) {
            return false
        }
        let toggleable = this.toggleable[index]
        if ('value' in toggleable && typeof (toggleable.value) == 'boolean') {
            console.log(toggleable.value);
            toggleable.value = !toggleable.value;
            return true;

        }

        return false;
    }

    get text() {
        return this.name;
    }
}

export default Hackable