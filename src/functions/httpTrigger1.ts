import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Document, Packer } from "docx";
import { PatchRequest } from "../types/requestTypes";
import { createPatches, genDoc } from "../services/docGen";

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const body: PatchRequest = await request.json() as PatchRequest;
    const patchDoc = body.patchDocument;
    const patchData = createPatches(body.patchData);
    const doc = await genDoc(patchData, patchDoc);

    return {body: doc};
};

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: httpTrigger1
});