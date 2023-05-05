exports.up = function(knex) {
    return knex.schema.createTable('user_read', function (table) {
        table.increments();
        table.integer('userId').references('user.id').onDelete('CASCADE');
        table.timestamp('lastRead').defaultTo(knex.fn.now());
        table.timestamp('created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_read');
};
