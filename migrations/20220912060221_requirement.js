exports.up = function(knex) {
    return knex.schema.createTable('requirement', function (table) {
        table.increments();
        table.string('os');
        table.string('processor');
        table.string('memory');
        table.string('graphic');
        table.string('directx');
        table.string('storage');
        table.integer('gameId').references('game.id').onDelete('CASCADE');
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('requirement');
};
