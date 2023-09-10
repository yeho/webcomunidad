import mysql from 'mysql2/promise'

let connection
try {
  connection = await mysql.createConnection({
    database: 'itscience',
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  })
} catch (e) {
  connection = undefined
}

export default connection
