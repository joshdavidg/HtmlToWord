import { Request, Response, NextFunction } from "express";
import { ValidationError } from "src/errors";
import { z, ZodError, ZodIssue } from 'zod';

export const validateData = (schema: z.ZodObject<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if(error instanceof ZodError) {
                const validationIssues = error.errors.map((issue: ZodIssue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`, 
                    context: issue
                }))
                throw new ValidationError(validationIssues,
                {
                    code: 400,
                    message: "Validation failed",
                    log: false
                })
            }

            res.status(500).json({ errors: [{ message: "Internal Server Error" }] })
        }
    }
}