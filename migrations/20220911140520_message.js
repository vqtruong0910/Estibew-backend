exports.up = function(knex) {
    return knex.schema.createTable('message', function (table) {
        table.increments();
        table.string('text');
        table.integer('fromId').references('user.id').onDelete('CASCADE');
        table.integer('toId').references('user.id').onDelete('CASCADE');
        table.timestamp('created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('message');
};
