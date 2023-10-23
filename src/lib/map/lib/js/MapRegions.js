class MapRegion {
    constructor(id, name, paths) {
        this.id = id;
        this.name = name;
        this.paths = paths;
    }
}

class Map {
    constructor(regions) {
        this.regions = regions
    }

    get(id) {
        return this.regions.get(id);
    }
}

export {Map, MapRegion}