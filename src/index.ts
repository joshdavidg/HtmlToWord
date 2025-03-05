import express from "express";
import "express-async-errors";
import cors from 'cors';
import { healthCheckRouter, wordPatcherRouter } from "./routes";
import { handleErrors, routeNotFoundHandler } from "./middleware";

const app = express();
const PORT = 1234

app.use(cors()).use(express.json({ limit: '100mb' }));

app.use(wordPatcherRouter);
app.use(healthCheckRouter);

app.use(routeNotFoundHandler);
app.use(handleErrors);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
