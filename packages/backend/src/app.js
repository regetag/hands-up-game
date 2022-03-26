import { Server } from "socket.io"
import express from "express"
import http from "node:http"
import cors from "cors"

import { roomRoutes } from "./routes/roomRoutes.js"
import SocketEvents from "./events/socketEvents.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
  }
})
const socketEvents = new SocketEvents(io)


app.use(cors())
app.use(express.json())
app.use("/rooms", roomRoutes)

socketEvents.listen()

export { server, io, app }