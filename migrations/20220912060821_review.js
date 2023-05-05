exports.up = function(knex) {
    return knex.schema.createTable('review', function (table) {
        table.increments();
        table.string('comment', [5000]);
        table.boolean('like');
        table.integer('gameId').references('game.id').onDelete('CASCADE');
        table.integer('userId').references('user.id').onDelete('CASCADE');
        table.timestamp('created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('review');
};
