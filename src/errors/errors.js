class badRequest extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.message = message;
    }
}

class notFound extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
        this.message = message;
    }
}

class conflict extends Error {
    constructor(message) {
        super(message);
        this.status = 409;
        this.message = message;
    }
}

class forbidden extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
        this.message = message;
    }
}

class unauthorized extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
        this.message = message;
    }
}

class serverError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
        this.message = message;
    }
}

module.exports = { badRequest, notFound, conflict, forbidden, unauthorized, serverError };