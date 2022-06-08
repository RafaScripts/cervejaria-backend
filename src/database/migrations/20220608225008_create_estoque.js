exports.up = function(knex) {
    return knex.schema
        .createTable('estoque', function (table) {
            table.increments('id').unique()

            table.string('nome').notNullable()
            table.integer('quantidade').notNullable()

            table.datetime('created_at').defaultTo(knex.fn.now())
            table.datetime('updated_at').defaultTo(knex.fn.now())
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("estoque")
};

exports.config = { transaction: false };