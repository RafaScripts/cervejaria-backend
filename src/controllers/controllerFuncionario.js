import Knex from "../database/index";
import bcrypt from "bcrypt";
import knex from "../database/index";

class controllerFuncionario {

    async index(req, res){
        
        const resposta = await Knex('funcionarios');

        return res.json(resposta);

       
        
    }

    async create(req, res){
        const {username,nome,password,cpf,Rua,numero,cidade,estado,cep,id_equipe} = req.body;


        const password_hash = await bcrypt.hash(password,8);

        await knex('funcionarios').insert({username,nome,password_hash,cpf,Rua,numero,cidade,estado,cep,id_equipe});
        
        return res.json('Foi Criado');
    
        

    }

}

export default new controllerFuncionario;

