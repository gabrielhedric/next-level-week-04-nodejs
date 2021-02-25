import express from 'express';
import "./database"
import { router } from './routes'; // importando o router do arquivo de rotas 

const app = express();

app.use(express.json());  // usando express para ler formato json 
app.use(router);

app.listen(3333, () => console.log("Server is running at localhost:3333"));