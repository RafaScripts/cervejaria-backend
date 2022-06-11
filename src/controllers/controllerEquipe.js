import knex from "../database/index";


class controllerEquipe {

    async index(req,res){
        const {id} = req.query;

        if(id){
            const equipe = await knex('equipe').where('id',id);
            return res.json(equipe);
        }

        const resposta = await knex('equipe');
        return res.json(resposta);

    }



    async create(req,res){

        const{
            nome_equipe,
            regiao,
            gerente} = req.body;

        await knex('equipe').insert({ 
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
                await knex('equipe').where('id',id).update({
                    nome_equipe,
                    regiao,
                    gerente
                });

                return res.json('Equipe Atualizada!');
            }

            return res.json('Nenhum dado de equipe foi informado!')

    }


    async delete(req,res){

        const {id}= req.query;

        await knex('equipe').delete().where({id:id});

        return res.json ('Equipe Deletada!')
    }
}


export default new controllerEquipe;