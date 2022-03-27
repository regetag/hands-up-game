import roomsController from "../controllers/roomsController.js"

export default class SocketGameEvents{
  #io
  #roomListIo

  constructor(io, roomListIo){
    this.#io = io
    this.#roomListIo = roomListIo
  }

  listen(){
    this.#io.on("connection", (socket) => {
      
      Object.entries(this).forEach( ([key, value]) => {
        if (key.includes("socket")) value(socket)
      })
    })
  }

  socketJoinRoom = socket => {
    socket.on("join-room", (roomId, callback) => {
      const currentRoom = roomsController.rooms[roomId]
      
      if (!currentRoom) return callback({ err: "Room not find" })

      const maxUsers = currentRoom.maxUsers
        
      if (currentRoom.users.length >= maxUsers) {
        return callback({ err: "room is full" })
      } 
  
      socket.join(roomId)
      roomsController.addUserRoom(roomId, socket.id)
  
      const preferences = roomsController.getPreferencesAvailable(roomId)
      this.#io.to(socket.id).emit("preferences", preferences)
        
      this.#roomListIo.emit("room-list", roomsController.rooms)
      // return logger.info(this.#io.sockets.adapter.rooms.get(roomId))
    })
  }

  socketDisconnecting = socket => {
    socket.on("disconnecting", () => {
      const roomId = Object.keys(roomsController.rooms).find((roomId) => roomId !== socket.id)
      
      if (!roomId) return

      const game = roomsController.getGame(roomId)

      game.removePlayer(socket.id)
      this.#io.to(roomId).emit("players-update", game.players)
      roomsController.deleteUserRoom(roomId, socket.id)


      for (let roomId in roomsController.rooms) {
        if (roomsController.rooms[roomId].users.length < 1) {
          delete roomsController.rooms[roomId]
          break
        }
      }
      
      this.#roomListIo.emit("room-list", roomsController.rooms)
    })
  }

  socketAmIReady = socket => {
    socket.on("am-i-ready", (roomId, isReady) => {
      const user = roomsController.getUser(roomId, socket.id)
      if(user){
        user.isReady = isReady
      }

      this.#io.to(roomId).emit("are-everyone-ready", roomsController.isEveryoneReady(roomId))
      
      if (!isReady) return

      const game = roomsController.getGame(roomId)
      const { color, type } = user.preference
      game.addNewPlayer(socket.id, color, type)
  
      if (roomsController.isEveryoneReady(roomId)) {
        this.#io.to(roomId).emit("stations", game.stations)
        const players = game.players
        const currentPlayer = players[game.currentPlayer].id
        this.#io.to(roomId).emit("players-update", players, currentPlayer, game.thiefMovements, game.round, game.finishGame())
      }
      
    })
  }

  socketPlayerChangePreferences = socket => {
    socket.on("player-change-preferences", (roomId, changes) => {
      roomsController.updateUserPreferences(roomId, socket.id, changes)
  
      const preferences = roomsController.getPreferencesAvailable(roomId)
      this.#io.to(roomId).emit("preferences", preferences)
    })
  }

  socketPlayerChangePositon = socket => {
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
      this.#io.to(roomId).emit("players-update", game.players, currentPlayer.id, game.thiefMovements, game.round, endGame)
    })

  }

  socketRestart = socket => {
    socket.on("restart", (roomId) => {
      const room = roomsController.rooms[roomId]
      room.restart()
    })
  }
}