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

    console.error(JSON.stringify(err, null, 2));
    return res.status(500).json({ errors: [{ message: "Internal Server Error" }] })
}