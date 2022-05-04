module.exports = {
    development: {
        client: 'pg',
        version: '14',
        connection: {
            host : '159.65.188.95',
            port : 5432,
            user : 'postgres',
            password : '032211',
            database : 'cervejaria'
        },
        migrations: {
            directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`
        }
    }
}