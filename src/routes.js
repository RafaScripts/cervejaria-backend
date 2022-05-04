import express from "express";
import controllerFuncionario from "./controllers/controllerFuncionario";

const Routes = express();

// Listagem
Routes.get('/', controllerFuncionario.index);

// Criação - ele recebe dados

// Altera - recebe dados para alterar

// Deletar - deleta dados

export default Routes;