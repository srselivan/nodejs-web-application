const Pool = require("pg").Pool
const pool = new Pool({
    user: 'postgres',
    host: 'database',
    database: 'db',
    password: 'root',
    port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}