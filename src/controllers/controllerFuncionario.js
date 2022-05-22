import Knex from "../database/index";
import bcrypt from "bcrypt";
import knex from "../database/index";

class controllerFuncionario {

    async index(req, res){
        const {id} = req.query;

        if(id){
            const funcionario = await Knex('funcionarios').where('id', id);
            return res.json(funcionario);
        }

        const resposta = await Knex('funcionarios');

        return res.json(resposta);



    }

    async create(req, res){
        const {
            email,
            username,
            nome,
            password,
            cpf,
            Rua,
            numero,
            cidade,
            estado,
            cep,
            id_equipe} = req.body;


        const password_hash = await bcrypt.hash(password,8);

        await knex('funcionarios').insert({
            email,
            username,
            nome,
            password_hash,
            cpf,
            Rua,
            numero,
            cidade,
            estado,
            cep,
            id_equipe});

        return res.json('Foi Criado');

    }

    async update(req, res){

        const {id}= req.query;
        const {
            email,
            username,
            nome,
            password,
            cpf,
            Rua,
            numero,
            cidade,
            estado,
            cep,
            id_equipe} = req.body;

        const endereco = {
            Rua,
            numero,
            cidade,
            estado,
            cep
        };

        if(password){
            const password_hash = await bcrypt.hash(password,8);
            await knex('funcionarios').where('id',id).update({
                password_hash,
            });
        }

        if(username){
            await knex('funcionarios').where('id',id).update({
                username,
            });
        }

        if(nome){
            await knex('funcionarios').where('id',id).update({
                nome,
            });
        }

        if(endereco){
            await knex('funcionarios').where('id',id).update({
                Rua,
                numero,
                cidade,
                estado,
                cep,
            });
        }

        if(cpf){
            await knex('funcionarios').where('id',id).update({
                cpf,
            });
        }

        if (email){

            await Knex('funcionarios').update({email: email}).where({id: id});

            return res.json('Ok email atualizado!');

        } if (id_equipe){
            await Knex('funcionarios').update({id_equipe: id_equipe}).where({id: id});

            return res.json('Ok equipe atualizada com sucesso!');

        }

        return res.json('Ops! nenhum dado foi informado :(');
    }

    async delete(req, res){
        const {id}= req.query;

        await Knex('funcionarios').delete().where({id: id});

        return res.json('Usuário deletado!');
    }
}

export default new controllerFuncionario;