import Knex from "../database/index";

class controllerCliente {

    async index(req, res) {
        const {id} = req.query;

        if (id) {
            const cliente = await Knex('clientes').where('id', id);
            return res.json(cliente);
        }

        const resposta = await Knex('clientes');

        return res.json(resposta);


    }

    async create(req, res) {
        const {
            email,
            nome,
            cpf,
            Rua,
            numero,
            telefone,
            cidade,
            estado,
            cep
        } = req.body;


        await knex('clientes').insert({
            email,
            nome,
            telefone,
            cpf,
            Rua,
            numero,
            cidade,
            estado,
            cep
        });

        return res.json('Foi Cadastrado');

    }

    async update(req, res) {

        const {id} = req.query;
        const {
            email,
            nome,
            telefone,
            Rua,
            numero,
            cidade,
            estado,
            cep,
        } = req.body;


        const endereco = {
            Rua,
            numero,
            cidade,
            estado,
            cep
        };

        const data = {
            email,
            nome,
            telefone,
            endereco
        };

        if (nome) {
            await knex('clientes').where('id', id).update({
                nome,
            });
        }

        if (telefone) {
            await knex('clientes').where('id', id).update({
                telefone,
            });
        }

        if (endereco) {
            await knex('clientes').where('id', id).update({
                Rua,
                numero,
                cidade,
                estado,
                cep,
            });
        }

        if (cpf) {
            await knex('clientes').where('id', id).update({
                cpf,
            });
        }

        if (email) {

            await Knex('clientes').update({email: email}).where({id: id});


        }

        if(!data){
            return res.json('Nenhum dado foi informado');
        }

        return res.json('Ok dados atualizados!');
    }

    async delete (req, res) {
        const {id} = req.query;
        await Knex('clientes').delete().where({id: id});

        return res.json('Cliente deletado!');
    }

}



export default new controllerCliente;
