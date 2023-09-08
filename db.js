import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  database: 'itscience',
  user: process.env.DB_USER,
  password: process.env.DB_PASS
})

export default connection
