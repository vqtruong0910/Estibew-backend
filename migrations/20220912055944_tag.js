exports.up = function(knex) {
    return knex.schema.createTable('tag', function (table) {
        table.increments();
        table.string('name');
        table.timestamp('created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tag');
};
