import { Request, Response } from "express";
import { createPatches, genDoc } from "src/services";
import { PatchRequest } from "src/types";

export const wordDocPatcher = async (req: Request, res: Response) => {
    const body: PatchRequest = req.body;
    const patchDoc = body.patchDocument;
    const patchData = createPatches(body.patchData);
    const doc = await genDoc(patchData, patchDoc);
    res.send({body: doc});
}