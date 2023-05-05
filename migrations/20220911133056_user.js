exports.up = function (knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments();
        table.string('username')
        table.string('email').notNullable();
        table.boolean('isEmailVerified').defaultTo(false);
        table.string('gender')
        table.string('phone')
        table.string('password')
        table.string('avatar')
        table.string('bio', [1000])
        table.string('interests')
        table.string('country')
        table.string('city')
        table.string('provider')
        table.string('providerId')
        table.date('birthday')
        table.boolean('banned').defaultTo(false);
        table.string('deleted')
        table.integer('role').defaultTo(0);
        table.datetime('lastActivedAt')
        table.timestamp('created').defaultTo(knex.fn.now());
        table.timestamp('updated').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};
