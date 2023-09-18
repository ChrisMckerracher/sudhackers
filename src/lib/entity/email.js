import Entity from "./field.js";

class Email extends Entity {
    constructor(name,
                subject,
                to,
                from,
                body
    ) {
        super(name, "Email");
        this.subject = subject;
        this.to = to;
        this.from = from;
        this.body = body;
    }

    get keySort() {
        return [
            "subject",
            "to",
            "from",
            "body",
        ]
    }

    get text() {
        return this.subject
    }
}

export default Email;