import { Room, User } from "../models/roomModels.js"

const roomsControllers = {
  rooms: {},
  roomsTimeOut:{
    //Aqui sera salvo os timeOuts de 10 segundos para destruir um jogo caso não entre jogadores.
  },
  new: function (req, res) {
    const { maxUsers, roomName } = req.body

    const roomId = Room.idGenerator()

    const newRoom = new Room(maxUsers, roomId, roomName)

    this.roomsTimeOut[roomId] = setTimeout( () => {
      delete this.rooms[roomId]
    }, 1000 * 10) // 10 Segundos
    
    this.rooms[roomId] = newRoom
    
    return res.status(201).send(roomId)
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