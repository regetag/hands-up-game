import { Game } from "./gameModels.js"

export class Room {
  constructor(maxUsers) {
    this.maxUsers = maxUsers
    this.users = []
    this.isReady = false
    this.preferences = {
      color: ["red", "green", "blue", "black", "yellow"],
      type: ["police1", "police2", "police3", "police4", "thief"]
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