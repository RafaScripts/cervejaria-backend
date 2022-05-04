import Knex from "../database/index";

class controllerFuncionario {

    async index(req, res){
        const resposta = await Knex('funcionarios');

        return res.json(resposta);
        
    }

}

export default new controllerFuncionario;

