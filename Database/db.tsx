// db.js
import postgres from 'postgres'

const sql = postgres('postgres://postgres:Fantasmas24@localhost:5433/FinanceAppDatabase', {
    host                 : 'localhost',            // Postgres ip address[s] or domain name[s]
    port                 : 5433,          // Postgres server port[s]
    database             : 'FinanceAppDatabase',            // Name of database to connect to
    username             : 'postgres',            // Username of database user
    password             : 'Fantasmas24'            // Password of database user
  })

export default sql