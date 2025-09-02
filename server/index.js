import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import todoRouter from './routes/todoRouter.js'
import userRouter from './routes/userRouter.js'

//index.js vastaa vain taustapalvelun käynnistämisestä ja reititysten delegoinnista todoRouter.js:lle.
dotenv.config()
const port = process.env.PORT //hakee ympäristömuuttujan port > tarkoitus määrittää millä portilla palvelin kuuntelee.


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', todoRouter)
app.use('/user', userRouter)

app.use((err, req, res, next) => { //tämä pitää olla jotta todorouterin virhekoodi toimii oikein. Tämä vastaanottaa kaikki next(err)-kutsut ja lähettää JSON-virhevastauksen.
  const statusCode = err.status || 500
  res.status(statusCode).json({
    error: { message: err.message, status: statusCode }
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})