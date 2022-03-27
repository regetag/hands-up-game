import { Game } from "./gameModels.js"

export class Room {
  constructor(maxUsers, roomId, roomName) {
    this.maxUsers = maxUsers || 5
    this.name = roomName || roomId
    this.users = []
    this.isReady = false
    this.preferences = {
      color: ["red", "green", "blue", "black", "yellow"],
      type: ["thief"]
    }

    for(let i = 1; i < this.maxUsers; i++){
      this.preferences.type.push("police" + i)
    }
    
    this.game = new Game()
  }
  static idGenerator() {
    const id = Math.random().toString(32).substring(2)
    return id.slice(0, 5)
  }

  restart(){
    this.game = new Game()
  }
}

export class User {
  constructor(id) {
    this.id = id
    this.isReady = false
    this.preference = {}
  }
}