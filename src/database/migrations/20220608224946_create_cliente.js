exports.up = function(knex) {
    return knex.schema
        .createTable('clientes', function (table) {
            table.increments('id').unique()

            table.text('email').notNullable()

            table.text('nome').notNullable()
            table.text('telefone').notNullable()
            table.text('cpf').notNullable()
            table.text('Rua').notNullable()
            table.text('cidade').notNullable()
            table.text('estado').notNullable()
            table.text('numero').notNullable()
            table.text('cep').notNullable()

            table.datetime('created_at').defaultTo(knex.fn.now())
            table.datetime('updated_at').defaultTo(knex.fn.now())
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("clientes")
};

exports.config = { transaction: false };