import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors";

export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomError) {
        const { statusCode, errors, log, message } = err;

        if(log) {
            console.error(JSON.stringify({
                code: statusCode,
                message: message,
                errors: errors,
                stack: err.stack,
            }, null, 2));
        }

        return res.status(statusCode).json({ message, errors });
    }

    console.error(JSON.stringify({
        name: err.name,
        message: err.message,
        stack: err.stack
    }, null, 2));

    return res.status(500).json({ message: "Internal Server Error", errors: [{ "message": err.message, "context": [] }] })
}