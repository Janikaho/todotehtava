import pkg from 'pg'
import dotenv from 'dotenv'


const environment = process.env.NODE_ENV || 'development' //hakee muuttujan NODE_ENV> tarkoitus kertoa missä ajoympäristössä sovellus toimii
dotenv.config()

const port = process.env.port
const { Pool } = pkg

const openDb = () => { //tietokantayhteys palautetaan db- tiedostosta
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: environment === 'development'
      ? process.env.DB_NAME
      : process.env.TEST_DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  })
  return pool
}

const pool = openDb()
export { pool }