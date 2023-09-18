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
            "history",
            "hackableItems",
        ]
    }
}

class IntersectionLocation extends DistrictLocation {
    constructor(name,
                locationType,
                history,
                district
    ) {
        super(name, locationType, history);
        this.district = district;
    }

}

class BuildingLocation extends IntersectionLocation {
    constructor(name,
                locationType,
                history,
                district,
                intersection,

    ) {
        super(name, locationType, history, district);
        this.intersection = intersection;
    }

}

export {DistrictLocation, IntersectionLocation, BuildingLocation};