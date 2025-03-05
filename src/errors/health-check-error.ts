import { CustomError, CustomErrorData } from "./custom-error";

export default class HealthCheckError extends CustomError {
    private static readonly _statusCode = 503;
    private readonly _code: number;
    private readonly _log: boolean;
    private readonly _issue: CustomErrorData[];

    constructor(healthCheckIssue: CustomErrorData[], params?: {code?: number, message?: string, log?: boolean}) {
        const { code, message, log } = params || {};
        super(message || "API unavailable!");
        this._code = code || HealthCheckError._statusCode;
        this._log = log || false;
        this._issue = healthCheckIssue;

        Object.setPrototypeOf(this, HealthCheckError.prototype);
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