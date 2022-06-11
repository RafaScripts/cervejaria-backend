import Knex from '../database/index';

class ControllerProdutos {
    async index(req, res){
        const { page } = req.query;

        if(page){
            const [count] = await Knex('produto').count();

            const produtos = await Knex('produto')
                .join('estoque', 'estoque.id', '=', 'produto.id_estoque')
                .limit(5)
                .offset((page - 1) * 5)
                .select(['produto.*', 'estoque.quantidade']);

            res.header('X-Total-Count', count['count(*)']);

            return res.json(produtos);
        }

        const produtos = await Knex('produto')
            .join('estoque', 'estoque.id', '=', 'produto.id_estoque')
            .select(['produto.*', 'estoque.quantidade']);

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

export default new ControllerProdutos;