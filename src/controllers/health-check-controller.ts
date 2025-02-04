import { Request, Response } from "express";
import { HealthCheckRes } from "../types";
import { HealthCheckError } from "../errors";

export const healthCheck = async (req: Request, res: Response): Promise<void> => {
    const health: HealthCheckRes = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(), 
        responsetime: process.hrtime()
    }

    try {
        res.send(health);
    } catch (e: any) {
        throw new HealthCheckError([{
            message: e.message,
            context: { "/healthcheck": "health check endpoint has an error"}
        }], {
            code: 503,
            message: "Server down!",
            log: true
        })
    }
}