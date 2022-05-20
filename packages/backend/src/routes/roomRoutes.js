import { Router } from "express"
import roomsControllers from "../controllers/roomsController.js"

const roomRoutes = Router()

roomRoutes.post("/new", roomsControllers.new.bind(roomsControllers))
roomRoutes.post("/:roomId/auth", roomsControllers.checkPassword.bind(roomsControllers))

export { roomRoutes }