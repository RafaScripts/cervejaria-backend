module.exports = {
    development: {
        client: 'pg',
        version: '14',
        connection: {
            host : '69.164.199.39',
            port : 5432,
            user : 'postgres',
            password : '032211',
            database : 'cervSys'
        },
        migrations: {
            directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`
        }
    }
}