import Knex from '../database/index';

class ControllerProdutos {
    async index(req, res){
        const { id } = req.query;
        const { page } = req.query;

        if(id){
            const produto = await Knex('produto').where('id', id).first();
            return res.json(produto);
        }

        if(page){
            const [count] = await Knex('produto').count();

            const produtos = await Knex('produto')
                .join('estoque', 'estoque.id', '=', 'produto.id_estoque')
                .limit(5)
                .offset((page - 1) * 5)
                .select(['produto.*', 'estoque.quantidade as quantidade']);

            res.header('X-Total-Count', count['count(*)']);

            return res.json(produtos);
        }

        const produtos = await Knex('produto')
            .join('estoque', 'estoque.id', '=', 'produto.id_estoque')
            .select(['produto.*', 'estoque.quantidade as quantidade']);

        return res.json(produtos);
    }

    async create(req, res){

        const {nome, price, commission, description, quantidade } = req.body;

        const id_estoque = await estoque(nome, quantidade);

        await Knex('produto').insert({
            nome,
            id_estoque,
            price,
            commission,
            description
        });

        return res.json({
            message: 'Produto cadastrado com sucesso!'
        });

    }

    async update(req, res){
        const { id } = req.params;
        const { nome, price, commission, description, quantidade } = req.body;

        await Knex('produto').where('id', id).update({
            nome,
            price,
            commission,
            description
        });

        if(quantidade){
            await estoqueUpdate(nome, quantidade);
            return res.json({
                message: 'Estoque atualizado com sucesso!'
            });
        }

        return res.json({
            message: 'Produto atualizado com sucesso!'
        });
    }

    async delete(req, res){
        const { id } = req.params;

        await Knex('produto').where('id', id).delete();

        return res.json({
            message: 'Produto deletado com sucesso!'
        });
    }
}

async function estoque(nome ,quantidade){

    await Knex('estoque').insert({
        nome,
        quantidade
    });

    const estoque = await Knex('estoque');

    const reverse = estoque.reverse();

    const id = reverse[0].id;

    return id;
}

async function estoqueUpdate(nome, quantidade){
    await Knex('estoque').where('nome', nome).update({
        quantidade
    });

    return;
}

export default new ControllerProdutos;