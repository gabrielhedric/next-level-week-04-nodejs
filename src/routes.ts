import { Router } from 'express'; 
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController(); // variável para instanciar a classe User Controller 
const surveysController = new SurveysController();

router.post("/users", userController.create); // rota de criação de usuário chamando classe userController com o método create
router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

export { router };