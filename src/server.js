import { createServer } from 'node:http'
import express from 'express'

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 56789


const app = express()
const server = createServer(app)

app.get('/health', (req, res) => {
  res.json({msg: "Healthy"})
})

app.listen(PORT, HOST, () => {
  console.log(`Server is up and running on ${HOST}:${PORT}`)
})