exports.up = function(knex) {
    return knex.schema.createTable('notification', function (table) {
        table.increments();
        table.string('content');
        table.string('title')
        table.string('sender')
        table.string('image')
        table.integer('userId').references('user.id').onDelete('CASCADE');
        table.timestamp('created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('notification');
};
