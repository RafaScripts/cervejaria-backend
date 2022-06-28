import Knex from "../database/index";


class controllerEquipe {

    async index(req,res){
        const {id} = req.query;

        if(id){
            const equipe = await Knex('equipe').where('id',id);
            return res.json(equipe);
        }

        const resposta = await Knex('equipe');
        return res.json(resposta);

    }



    async create(req,res){

        const{
            nome_equipe,
            regiao,
            gerente} = req.body;

        await Knex('equipe').insert({
            nome_equipe,
            regiao,
            gerente});
            
            return res.json('Equipe Criada!')
        

    }


    async update(req,res){


        const {id}= req.query;
        const{
            nome_equipe,
            regiao,
            gerente} =req.body;



            if(nome_equipe && regiao && gerente){
                await Knex('equipe').where({id: id}).update({
                    nome_equipe,
                    regiao,
                    gerente
                });

                return res.json('Equipe Atualizada!');
            }

            return res.status(400).json('Nenhum dado de equipe foi informado!')

    }


    async delete(req,res){

        const {id}= req.query;

        await Knex('equipe').delete().where({id:id});

        return res.json ('Equipe Deletada!')
    }
}


export default new controllerEquipe;