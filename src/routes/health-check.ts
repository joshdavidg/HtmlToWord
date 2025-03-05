import express, { Router } from "express";
import { healthCheck } from "../controllers";

const healthCheckRouter: Router = express.Router();

healthCheckRouter.get("/healthcheck", healthCheck);

export default healthCheckRouter;