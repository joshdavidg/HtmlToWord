import { CustomError } from "./custom-error";

export default class BadRequestError extends CustomError {
    private static readonly _statusCode = 400;
    private readonly _code: number;
    private readonly _log: boolean;
    private readonly _context: { [key: string]: any }

    constructor(params?: {code?: number, message?: string, log?: boolean, context?: { [key: string]: any }}) {
        const { code, message, log} = params || {};

        super(message || "Bad Request");
        this._code = code || BadRequestError._statusCode;
        this._log = log || true;
        this._context = params?.context || {};

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    get errors() {
        return [{ message: this.message, context: this._context }];
    }

    get statusCode() {
        return this._code;
    }

    get log() {
        return this._log;
    }
}