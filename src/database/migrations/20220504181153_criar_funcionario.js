exports.up = function(knex) {
    return knex.schema
        .createTable('funcionarios', function (table) {
            table.increments('id').unique()

            table.text('email').notNullable()
            table.text('username').notNullable()
            table.text('password_hash').notNullable()

            table.text('nome').notNullable()
            table.text('telefone').notNullable()
            table.text('cpf').notNullable()
            table.text('Rua').notNullable()
            table.text('cidade').notNullable()
            table.text('estado').notNullable()
            table.text('numero').notNullable()
            table.text('cep').notNullable()

            table.integer('id_equipe').defaultTo(null)
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("funcionarios")
};

exports.config = { transaction: false };