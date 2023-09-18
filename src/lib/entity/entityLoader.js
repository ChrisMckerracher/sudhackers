import Creature from "./creature.js";

class EntityLoader {

    static load(type, entity) {
        switch (type) {
            case "creature":
                return Object.assign(new Creature(), entity);
                break;
            case "email":
                break;
            default:
                break;
        }
    }
}

export default EntityLoader