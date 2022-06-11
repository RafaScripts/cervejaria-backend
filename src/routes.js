import express from "express";
import controllerEquipe from "./controllers/controllerEquipe";
import controllerFuncionario from "./controllers/controllerFuncionario";


const Routes = express();

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





export default Routes;