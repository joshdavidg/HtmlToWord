import { CustomError, CustomErrorData } from "./custom-error";

export default class NotFoundError extends CustomError {
    private static readonly _statusCode = 404;
    private readonly _code: number;
    private readonly _log: boolean;
    private readonly _issue: CustomErrorData[];

    constructor(notFoundIssue: CustomErrorData[], params?: {code?: number, message?: string, log?: boolean}) {
        const { code, message, log } = params || {};
        super(message || "Not found!");
        this._code = code || NotFoundError._statusCode;
        this._log = log || false;
        this._issue = notFoundIssue;

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    get errors(): CustomErrorData[] {
        return this._issue;
    }

    get statusCode(): number {
        return this._code;
    }

    get log(): boolean {
        return this._log;
    }
}