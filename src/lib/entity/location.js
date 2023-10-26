import Entity from "./field.js";

class DistrictLocation extends Entity {
    constructor(name,
                locationType,
                history
    ) {
        super(name, "location");
        this.locationType = locationType;
        this.history = history;
    }

    get keySort() {
        return [
            "name",
            "locationType",
            "history"
        ]
    }

    get text() {
        return this.name;
    }
}

class IntersectionLocation extends DistrictLocation {
    constructor(name,
                locationType,
                history,
                district,
                hackableItems
    ) {
        super(name, locationType, history);
        this.district = district;
        this.hackableItems = hackableItems;
    }

    get keySort() {
        return [
            "name",
            "district",
            "history",
            "hackableItems"
        ]
    }

}

class BuildingLocation extends IntersectionLocation {
    constructor(name,
                locationType,
                history,
                district,
                intersection,
                hackableItems

    ) {
        super(name, locationType, history, district, hackableItems);
        this.intersection = intersection;
    }

    get keySort() {
        return [
            "name",
            "district",
            "intersection",
            "history",
            "hackableItems"
        ]
    }

}

export {DistrictLocation, IntersectionLocation, BuildingLocation};