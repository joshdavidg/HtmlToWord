import express from "express";
import { wordDocPatcher } from "src/controllers";
import { BadRequestError } from "src/errors";

const wordPatcherRouter = express.Router();

wordPatcherRouter.post('/word-patcher', wordDocPatcher);

export default wordPatcherRouter;