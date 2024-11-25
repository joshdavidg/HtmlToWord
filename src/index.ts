import express from "express";
import cors from 'cors';
import { PatchRequest } from "./types/requestTypes";
import { createPatches, genDoc } from "./services/docGen";

const app = express();

app.use(cors()).use(express.json());

app.post('/', (req, res) => {
    const data = req.body;
    console.table(data);
    res.send("received");
})

app.post('/patch-word', async (req, res) => {
    const body: PatchRequest = req.body;
    const patchDoc = body.patchDocument;
    const patchData = createPatches(body.patchData);
    const doc = await genDoc(patchData, patchDoc);
    res.send({body: doc});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});