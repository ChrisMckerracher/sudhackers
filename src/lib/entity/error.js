import Entity from "./field.js";

class ErrorEntity extends Entity {
    constructor(name,
                body
    ) {
        super(name, "error");
        this.body = body;
    }

    get keySort() {
        return [
            "name",
            "body",
        ]
    }

    get text() {
        return this.name
    }
}

export default ErrorEntity;