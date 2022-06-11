exports.up = function(knex) {
    return knex.schema
        .createTable('produto', function (table) {
            table.increments('id').unique()

            table.string('nome').notNullable()
            table.integer('id_estoque').references('estoque.id').defaultTo(null)
            table.double('price').notNullable()
            table.double('commission').notNullable()
            table.string('description').notNullable()

            table.datetime('created_at').defaultTo(knex.fn.now())
            table.datetime('updated_at').defaultTo(knex.fn.now())
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("produto")
};

exports.config = { transaction: false };

/*



 */