import { CustomError, CustomErrorData } from "./custom-error";

export default class ValidationError extends CustomError {
    private static readonly _statusCode = 400;
    private readonly _code: number;
    private readonly _log: boolean;
    private readonly _validationIssues: CustomErrorData[];

    constructor(validationIssues: CustomErrorData[], params?: {code?: number, message?: string, log?: boolean}) {
        const { code, message, log} = params || {};

        super(message || "Invalid Request");
        this._code = code || ValidationError._statusCode;
        this._log = log || false;
        this._validationIssues = validationIssues;

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    get errors() {
        return this._validationIssues;
    }

    get statusCode() {
        return this._code;
    }

    get log() {
        return this._log;
    }
}