import { Server } from "socket.io"
import express from "express"
import http from "node:http"
import cors from "cors"

import { roomRoutes } from "./routes/roomRoutes.js"
import SocketEvents from "./events/socketGameEvents.js"
import SocketRoomListEvents from "./events/socketRoomListEvents.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
  }
})

const socketRoomListEvents = new SocketRoomListEvents(io)
const socketEvents = new SocketEvents(io, socketRoomListEvents.io)

socketEvents.listen()
socketRoomListEvents.listen()

app.use(cors())
app.use(express.json())
app.use("/rooms", roomRoutes)


export { server, io, app }