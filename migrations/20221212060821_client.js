exports.up = function(knex) {
    return knex.schema.createTable('client', function (table) {
        table.increments();
        table.string('userId');
        table.string('provider');
        table.string('ip');
        table.timestamp('created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('client');
};
