import Creature from "./creature.js";
import Email from "./email.js";
import {IntersectionLocation} from "./location.js";

class EntityLoader {

    static load(type, entity) {
        switch (type) {
            case "creature":
                return Object.assign(new Creature(), entity);
                break;
            case "email":
                return Object.assign(new Email(), entity);
            case "location":
                let locationType = entity.locationType;

                switch (locationType) {
                    case "intersection":
                        return Object.assign(new IntersectionLocation(), entity);
                }
            default:
                break;
        }
    }
}

export default EntityLoader