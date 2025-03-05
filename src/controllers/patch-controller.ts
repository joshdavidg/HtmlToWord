import { Request, Response } from "express";
import { createPatches, genDoc } from "../services";
import { PatchRequest } from "../types";

export const wordDocPatcher = async (req: Request, res: Response): Promise<void> => {
    const body: PatchRequest = req.body;
    const patchDoc = Buffer.from(body.patchDocument, "base64");
    const patchData = createPatches(body.patchData);
    const doc = await genDoc(patchData, patchDoc);

    res.send({ "$content-type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "$content": doc });
}