import express from "express";
import { wordDocPatcher } from "../controllers";
import { validateData } from "../middleware";
import { wordPatchRequestSchema } from "../schemas";

const wordPatcherRouter = express.Router();

wordPatcherRouter.post('/word-patcher', validateData(wordPatchRequestSchema), wordDocPatcher);

export default wordPatcherRouter;