import express from "express";
import "express-async-errors";
import cors from 'cors';
import { wordPatcherRouter } from "./routes";
import { handleErrors } from "./middleware";

const app = express();
const PORT = 1234

app.use(cors()).use(express.json());

app.use(wordPatcherRouter);

app.use(handleErrors);

app.get('/', (req, res) => {
    res.send("Api is running...");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});