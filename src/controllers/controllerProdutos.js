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
				.limit(5)
				.offset((page - 1) * 5);

			res.header('X-Total-Count', count['count(*)']);

			return res.json(produtos);
		}

		const produtos = await Knex('produto');

		return res.json(produtos);
	}

	async create(req, res){

		const {nome, price, commission, description } = req.body;

		await Knex('produto').insert({
			nome,
			price,
			commission,
			description
		});

		return res.json({
			message: 'Produto cadastrado com sucesso!'
		});

	}

	async update(req, res){
		const { id } = req.query;
		const { nome, price, commission, description } = req.body;


		await Knex('produto').where('id', id).update({
			nome,
			price,
			commission,
			description
		});

		return res.json({
			message: 'Produto atualizado com sucesso!'
		});
	}

	async delete(req, res){
		const { id } = req.query;

		await Knex('produto').where('id', id).delete();

		return res.json({
			message: 'Produto deletado com sucesso!'
		});
	}
}

export default new ControllerProdutos;