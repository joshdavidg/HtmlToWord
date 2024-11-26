export type CustomErrorData = {
    message: string, 
    context?: { [key: string]: any }
}

export abstract class CustomError extends Error {
    abstract readonly statusCode: number;
    abstract readonly errors: CustomErrorData[];
    abstract readonly log: boolean;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}