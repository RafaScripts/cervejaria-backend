import express from "express";
import controllerFuncionario from "./controllers/controllerFuncionario";

const Routes = express();


Routes.get('/funcionario', controllerFuncionario.index)
.post('/funcionario', controllerFuncionario.create);




export default Routes;