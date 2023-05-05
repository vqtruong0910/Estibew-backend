exports.up = function(knex) {
    return knex.schema.createTable('game_tag', function (table) {
        table.increments();
        table.integer('gameId').references('game.id').onDelete('CASCADE');
        table.integer('tagId').references('tag.id').onDelete('CASCADE');
        table.timestamp('created').defaultTo(knex.fn.now());
    });z
};

exports.down = function(knex) {
    return knex.schema.dropTable('game_tag');
};
