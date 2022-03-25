import express from "express"
import http from "node:http"
import path from "node:path"
import { Server } from "socket.io"
import cors from "cors"

import roomsController from "./controllers/roomsController.js"
import { roomRoutes } from "./routes/roomRoutes.js"

const __dirname = import.meta.url

const app = express()
const server = http.createServer(app)
const io = new Server(server)




app.use(cors())
app.use(express.json)
app.use(express.static(path.join(__dirname, "client", "build")))
app.use("/rooms", roomRoutes)


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})



// Quando vamos conectar com alguma pagina fora do proprio server, nós devemos configurar o cors pelo prorio socket, e não pelo express
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   }
// })


io.on("connection", (socket) => {
  socket.on("join-room", (roomId, callback) => {
    const currentRoom = roomsController.rooms[roomId]
    if (currentRoom) {
      const maxUsers = currentRoom.maxUsers
      if (currentRoom.users.length < maxUsers) {
        socket.join(roomId)
        roomsController.addUserRoom(roomId, socket.id)
        const preferences = roomsController.getPreferencesAvailable(roomId)
        io.to(socket.id).emit("preferences", preferences)
        // console.log(io.sockets.adapter.rooms.get(roomId))
      } else {
        callback({ err: "room is full" })
      }
    } else {
      callback({ err: "Room not find" })
    }
  })

  socket.on("disconnecting", () => {
    const roomId = [...socket.rooms].find((roomId) => roomId !== socket.id)
    if (roomId) {
      const game = roomsController.getGame(roomId)
      game.removePlayer(socket.id)
      io.to(roomId).emit("players-update", game.players)
      roomsController.deleteUserRoom(roomId, socket.id)
    }
    for (let roomId in roomsController.rooms) {
      if (roomsController.rooms[roomId].users.length < 1) {
        delete roomsController.rooms[roomId]
        break
      }
    }
  })

  socket.on("am-i-ready", (roomId, isReady) => {
    const user = roomsController.getUser(roomId, socket.id)
    if(user){
      user.isReady = isReady
    }
    io.to(roomId).emit("are-everyone-ready", roomsController.isEveryoneReady(roomId))
    if (isReady) {
      const game = roomsController.getGame(roomId)
      const { color, type } = user.preference
      game.addNewPlayer(socket.id, color, type)

      if (roomsController.isEveryoneReady(roomId)) {
        io.to(roomId).emit("stations", game.stations)
        const players = game.players
        const currentPlayer = players[game.currentPlayer].id
        io.to(roomId).emit("players-update", players, currentPlayer, game.thiefMovements, game.round, game.finishGame())
      }
    }
  })

  socket.on("player-change-preferences", (roomId, changes) => {
    roomsController.updateUserPreferences(roomId, socket.id, changes)

    const preferences = roomsController.getPreferencesAvailable(roomId)
    io.to(roomId).emit("preferences", preferences)
  })

  socket.on("player-change-position", (roomId, playersUpdate, vehicle) => {
    const game = roomsController.getGame(roomId)
    game.players = playersUpdate
    game.currentPlayer++
    if (game.currentPlayer >= game.players.length) {
      game.currentPlayer = 0
      game.round--
    }
    const currentPlayer = game.players[game.currentPlayer]

    const player = game.getPlayer(socket.id)
    if (player.type === "thief") {
      game.thiefMovements.push({ round: game.round + 1, vehicle })
      game.updateThiefHidden(player)
    }

    const endGame = game.finishGame()
    io.to(roomId).emit("players-update", game.players, currentPlayer.id, game.thiefMovements, game.round, endGame)
  })

  socket.on("restart", (roomId) => {
    const room = roomsController.rooms[roomId]
    room.restart()
  })
})


export { server, io, app }