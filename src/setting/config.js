const databaseConfig = {
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USER,
        ...(process.env.NODE_ENV != 'development' ? {ssl: { rejectUnauthorized: false}} : undefined),
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
}

module.exports = { databaseConfig }