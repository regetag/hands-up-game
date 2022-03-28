import { Room, User } from "../models/roomModels.js"
import { logger } from "../utils/logger.js"

const roomsControllers = {
  rooms: {},
  roomsTimeOut:{
    //Aqui sera salvo os timeOuts de 10 segundos para destruir um jogo caso não entre jogadores.
  },
  roomsPassword:{},
  new: function (req, res) {
    const { maxUsers, roomName, password } = req.body

    const roomId = Room.idGenerator()

    const newRoom = new Room(maxUsers, roomId, roomName, !!password)

    this.roomsTimeOut[roomId] = setTimeout( () => {
      delete this.rooms[roomId]
    }, 1000 * 10) // 10 Segundos

    if(password) this.roomsPassword[roomId] = password
    
    this.rooms[roomId] = newRoom

    logger.info(`Room:${roomId} created with password:${password}`)
    
    return res.status(201).send(roomId)
  },

  checkPassword: function (req, res) {
    const { roomId } = req.params
    const { password } = req.body

    const roomPassword = this.roomsPassword[roomId]

    if(roomPassword !== password){
      return res.status(400).send("Wrong password!")
    }
    
    return res.sendStatus(200)
  },

  isEveryoneReady: function (roomId) {
    const roomIdFromRooms = this.rooms[roomId]
    this.rooms[roomId].isReady = roomIdFromRooms.users.every(({ isReady }) => isReady)
    return roomIdFromRooms.isReady
  },

  addUserRoom: function (roomId, userId) {
    const roomIdFromRooms = this.rooms[roomId]
    
    if(this.roomsTimeOut[roomId]) clearTimeout(this.roomsTimeOut[roomId])

    const user = new User(userId)

    roomIdFromRooms.users.push(user)
  },

  deleteUserRoom: function (roomId, userId) {
    const roomIdFromRooms = this.rooms[roomId]
    const filteredUsers = roomIdFromRooms.users.filter(({ id }) => id !== userId)

    roomIdFromRooms.users = filteredUsers
  },

  getUser: function (roomId, userId) {
    const roomIdFromRooms = this.rooms[roomId]
    if (roomIdFromRooms) {
      return roomIdFromRooms.users.find(({ id }) => id === userId)
    }
  },

  getPreferencesAvailable(roomId) {
    const roomIdFromRooms = this.rooms[roomId]

    if (!roomIdFromRooms) return

    const preferences = roomIdFromRooms.users.map(({ preference }) => preference)
    const usedColors = preferences.map(({ color }) => color)
    const usedTypes = preferences.map(({ type }) => type)
    const color = roomIdFromRooms.preferences.color.filter((color) => !usedColors.includes(color))
    const type = roomIdFromRooms.preferences.type.filter((type) => !usedTypes.includes(type))

    return { color, type }
    
  },

  updateUserPreferences(roomId, userId, newPreference) {
    const user = this.getUser(roomId, userId)

    if (user) {
      user.preference = newPreference
    }
  },

  getGame: function (roomId) {
    const roomIdFromRooms = this.rooms[roomId]

    if (roomIdFromRooms) {
      return roomIdFromRooms.game
    }
  }

}

export default roomsControllers