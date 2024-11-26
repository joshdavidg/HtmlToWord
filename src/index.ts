import express from "express";
import "express-async-errors";
import cors from 'cors';
import { wordPatcherRouter } from "./routes";
import { handleErrors } from "./middleware";

const app = express();

app.use(cors()).use(express.json());

app.post('/', (req, res) => {
    const data = req.body;
    console.table(data);
    res.send("received");
})

app.use(wordPatcherRouter);

app.use(handleErrors);

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});