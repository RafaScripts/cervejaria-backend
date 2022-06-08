exports.up = function(knex) {
    return knex.schema
        .createTable('equipe', function (table) {
            table.increments('id').unique()

            table.string('nome').notNullable()
            table.string('função').notNullable()

            table.datetime('created_at').defaultTo(knex.fn.now())
            table.datetime('updated_at').defaultTo(knex.fn.now())
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("equipe")
};

exports.config = { transaction: false };