import { createServer } from 'node:http'
import express from 'express'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Server } from 'socket.io'

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 56789

const __dirname = dirname(fileURLToPath(import.meta.url)) 

const app = express()
const server = createServer(app)
const io = new Server(server);

app.get('/health', (req, res) => {
  res.json({msg: "Healthy"})
})

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'))
})

io.on('connection', sock => {
  console.log(`connected socket id: ${sock.id}`)



  sock.on('disconnect', () => {
    console.log(`socket disconnected: ${sock.id}`)
  })
})

server.listen(PORT, HOST, () => {
  console.log(`Server is up and running on ${HOST}:${PORT}`)
})