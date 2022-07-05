exports.up = function(knex) {
    return knex.schema
        .createTable('estoque', function (table) {
            table.increments('id').unique()

            table.string('nome')
            table.integer('idProduto').references('produto.id').notNullable()
            table.integer('quantidade').notNullable()
            table.string('localizacao').notNullable()
            table.datetime('dataVencimento').notNullable()

            table.datetime('created_at').defaultTo(knex.fn.now())
            table.datetime('updated_at').defaultTo(knex.fn.now())
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("estoque")
};

exports.config = { transaction: false };