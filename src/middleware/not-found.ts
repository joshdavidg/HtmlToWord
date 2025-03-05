import { NextFunction, Request, Response } from "express";
import { CustomErrorData, NotFoundError } from "../errors";

export const routeNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const notFoundIssue: CustomErrorData = {
        message: "Invalid path",
        context: {
            "path": req.path
        }
    }

    throw new NotFoundError([notFoundIssue], {
        code: 404,
        message: "Resource not found!",
        log: false 
    })
}