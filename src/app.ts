import express from 'express';
import createConnection from "./database";
import { router } from './routes'; // importando o router do arquivo de rotas 

createConnection();
const app = express();

app.use(express.json());  // usando express para ler formato json 
app.use(router);

export { app };