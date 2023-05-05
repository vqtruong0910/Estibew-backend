exports.up = function(knex) {
    return knex.schema.createTable('developer', function (table) {
        table.increments();
        table.string('name');
        table.integer('gameId').references('game.id').onDelete('CASCADE');
        table.timestamp('created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('developer');
};
