import roomsController from "../controllers/roomsController.js"

export default class socketRoomListEvents{
  #io
  
  constructor(io){
    this.#io = io.of("/roomList")
  }

  listen(){
    this.#io.on("connect", (socket) => {
      this.#emitNewUserAllRooms(socket)
    })
  }

  get io(){
    return this.#io
  }
  
  #emitNewUserAllRooms(socket){
    socket.emit("room-list", roomsController.rooms)
  }
}