import express from "express";
import { wordDocPatcher } from "src/controllers";
import { validateData } from "src/middleware";
import { wordPatchRequestSchema } from "src/schemas";

const wordPatcherRouter = express.Router();

wordPatcherRouter.post('/word-patcher', validateData(wordPatchRequestSchema), wordDocPatcher);

export default wordPatcherRouter;