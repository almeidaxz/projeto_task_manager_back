const { DatabaseError } = require("pg");

// Error handler com classes de erros costumizadas
class badRequest extends Error {
    constructor(message) {
        super(message);
        this.code = 400;
        this.message = message;
    }
}

class notFound extends Error {
    constructor(message) {
        super(message);
        this.code = 404;
        this.message = message;
    }
}

class conflict extends Error {
    constructor(message) {
        super(message);
        this.code = 409;
        this.message = message;
    }
}

class forbidden extends Error {
    constructor(message) {
        super(message);
        this.code = 403;
        this.message = message;
    }
}

class unauthorized extends Error {
    constructor(message) {
        super(message);
        this.code = 401;
        this.message = message;
    }
}

class dbError extends DatabaseError {
    constructor(message) {
        super(message);
        this.code = 500;
        this.message = message;
    }
}

class internalError extends Error {
    constructor(message) {
        super(message);
        this.code = 500;
        this.message = message;
    }
}

module.exports = {
    badRequest,
    notFound,
    conflict,
    forbidden,
    unauthorized,
    dbError,
    internalError
};