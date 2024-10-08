import express, { Express } from "express";
import { save, load, list, listScores, saveScore } from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());

app.get("/api/list", list);
app.get("/api/load", load);
app.post("/api/save", save);
app.post("/api/saveScore", saveScore);
app.get("/api/listScores", listScores);
//One singular slash can kill, it seems, at least it killed my sanity. Thank you 331 TAs, for that wonderful experience

app.listen(port, () => console.log(`Server listening on ${port}`));
