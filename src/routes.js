import express from "express";
import controllerEquipe from "./controllers/controllerEquipe";
import controllerFuncionario from "./controllers/controllerFuncionario";
import ControllerProdutos from "./controllers/controllerProdutos";
import controllerCliente from "./controllers/controllerCliente";
import ControllerLogin from "./controllers/controllerLogin";

import token_auth from './midlewares/token_auth';

const Routes = express();

Routes.post('/login', ControllerLogin.login);

// Midleware para autenticação
Routes.use(token_auth);

// Rota para modulo funcionarios
Routes.get('/funcionario', controllerFuncionario.index)
    .post('/funcionario', controllerFuncionario.create)
    .put('/funcionario', controllerFuncionario.update)
    .delete('/funcionario', controllerFuncionario.delete);


// rota para o modulo equipe
Routes.get('/equipe', controllerEquipe.index)
      .post('/equipe', controllerEquipe.create)  
      .put('/equipe', controllerEquipe.update)
      .delete('/equipe', controllerEquipe.delete);

// Rota para o modulo produtos
Routes.get('/produtos', ControllerProdutos.index)
    .post('/produtos', ControllerProdutos.create)
    .put('/produtos', ControllerProdutos.update)
    .put('/produtos/estoque', ControllerProdutos.upEstoque)
    .delete('/produtos', ControllerProdutos.delete);

// Rota para o modulo cliente
Routes.get('/cliente', controllerCliente.index)
    .post('/cliente', controllerCliente.create)
    .put('/cliente', controllerCliente.update)
    .delete('/cliente', controllerCliente.delete);



export default Routes;