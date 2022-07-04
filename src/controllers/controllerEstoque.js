import Knex from '../database/index';

class controllerEstoque {
  async index(req, res) {
    const estoque = await Knex('estoque').select('*');
    return res.json(estoque);
  }

  async create(req, res) {
    const { idProduto, quantidade, DataVencimento, localizacao } = req.body;
    if(!idProduto){
      return res.status(400).json({ error: 'idProduto is required' });
    }

    let dataVencimento = new Date(DataVencimento);

    const estoque = await Knex('estoque').insert({
      idProduto,
      quantidade,
      dataVencimento,
      localizacao,
    });
    return res.json(estoque);
  }

  async update(req, res) {
    const { id } = req.query;
    const { idProduto, quantidade, DataVencimento, localizacao } = req.body;

    if(!idProduto){
      return res.status(400).json({ error: 'idProduto is required' });
    }

    let dataVencimento = new Date(DataVencimento);

    const estoque = await Knex('estoque').where('id', id).update({
      idProduto,
      quantidade,
      dataVencimento,
      localizacao,
    });
    return res.json(estoque);
  }

  async delete(req, res) {
    const { id } = req.query;
    const estoque = await Knex('estoque').where('id', id).first();

    if(estoque.quantidade !== 0){
      return res.status(400).json({ error: 'Estoque não pode ser excluído' });
    }

    const estoqueDelete = await Knex('estoque').where('id', id).delete();

    return res.json(estoqueDelete);
  }
}

export default new controllerEstoque;