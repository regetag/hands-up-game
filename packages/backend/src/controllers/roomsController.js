import { Room, User } from "../models/roomModels.js"
// import { Game } from "../models/gameModels.js"

const roomsControllers = {
  rooms: {},
  new: function (req, res) {
    const { maxUsers, roomName } = req.body

    const roomId = Room.idGenerator()

    const newRoom = new Room(maxUsers, roomId, roomName)
    
    this.rooms[roomId] = newRoom
    
    return res.status(201).send(roomId)
  },

  delete: function (req, res) {
    const idToDelete = req.body.roomId
    delete this.rooms[idToDelete]
  },

  hasRoom: function (req, res) {
    const { roomId } = req.params
    
    if (this.rooms[roomId]) {
      return res.send({ exist: true })
    } 

    return res.send({ exist: false })
  },

  isEveryoneReady: function (roomId) {
    const roomIdFromRooms = this.rooms[roomId]
    this.rooms[roomId].isReady = roomIdFromRooms.users.every(({ isReady }) => isReady)
    return roomIdFromRooms.isReady
  },

  addUserRoom: function (roomId, userId) {
    const roomIdFromRooms = this.rooms[roomId]
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