import Knex from "../database/index";
import bcrypt from "bcrypt";

class controllerFuncionario {

    async index(req, res){
        const {id} = req.query;

        if(id){
            const funcionario = await Knex('funcionarios').where('id', id);
            return res.json(funcionario);
        }

        const resposta = await Knex('funcionarios').join('equipe', 'funcionarios.id_equipe', '=', 'equipe.id').select('funcionarios.*', 'equipe.*');

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
            telefone,
            cidade,
            estado,
            cep,
            id_equipe} = req.body;


        const password_hash = await bcrypt.hash(password,8);

        await Knex('funcionarios').insert({
            email,
            username,
            nome,
            telefone,
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
            telefone,
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
            await Knex('funcionarios').where('id',id).update({
                password_hash,
            });
        }

        if(username){
            await Knex('funcionarios').where('id',id).update({
                username,
            });
        }

        if(nome){
            await Knex('funcionarios').where('id',id).update({
                nome,
            });
        }

        if(telefone){
            await Knex('funcionarios').where('id',id).update({
                telefone,
            });
        }

        if(endereco){
            await Knex('funcionarios').where('id',id).update({
                Rua,
                numero,
                cidade,
                estado,
                cep,
            });
        }

        if(cpf){
            await Knex('funcionarios').where('id',id).update({
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
