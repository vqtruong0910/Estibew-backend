exports.up = function(knex) {
    return knex.schema.createTable('privacy', function (table) {
        table.increments();
        table.boolean('profile').defaultTo(false);
        table.boolean('info').defaultTo(false);
        table.boolean('wishlist').defaultTo(false);
        table.boolean('purchased').defaultTo(false);
        table.boolean('review').defaultTo(false);
        table.boolean('notificationInfo').defaultTo(false);
        table.boolean('notificationSetting').defaultTo(false);
        table.integer('userId').references('user.id').onDelete('CASCADE');
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('privacy');
};
