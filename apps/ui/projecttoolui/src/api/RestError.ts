export class RestError extends Error {
    status: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.status = statusCode;
        Object.setPrototypeOf(this, RestError.prototype);
    }
}
