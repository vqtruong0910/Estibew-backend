exports.up = function(knex) {
    return knex.schema.createTable('game', function (table) {
        table.increments();
        table.date('released')
        table.string('name')
        table.float('price')
        table.string('image')
        table.string('size')
        table.string('file')
        table.string('intro', [10000])
        table.string('deleted').defaultTo(null);
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('game');
};
