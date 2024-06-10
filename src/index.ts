import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`)
  next()
})
app.use('/api', userRoutes)


app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`)
})