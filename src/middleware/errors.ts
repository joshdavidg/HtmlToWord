import { NextFunction, Request, Response } from "express";
import { CustomError } from "src/errors";

export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomError) {
        const { statusCode, errors, log } = err;

        if(log) {
            console.error(JSON.stringify({
                code: statusCode,
                errors: errors,
                stack: err.stack,
            }, null, 2));
        }

        return res.status(statusCode).send({ errors });
    }

    console.error(JSON.stringify(err, null, 2));
    return res.status(500).send({ errors: [{ message: "Internal Server Error: Something went wrong!" }] })
}