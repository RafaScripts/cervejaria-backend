exports.up = function(knex) {
    return knex.schema
        .createTable('equipe', function (table) {
            table.increments('id').unique()

            table.string('nome_equipe').notNullable()
            table.string('regiao').notNullable()
            table.string('gerente').defaultTo(null)

            table.datetime('created_at').defaultTo(knex.fn.now())
            table.datetime('updated_at').defaultTo(knex.fn.now())
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("equipe")
};

exports.config = { transaction: false };