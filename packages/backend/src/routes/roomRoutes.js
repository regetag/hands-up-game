import { Router } from "express"
import roomsControllers from "../controllers/roomsController.js"

const roomRoutes = Router()


roomRoutes.post("/new", roomsControllers.new.bind(roomsControllers))
// roomRoutes.delete("/delete", roomsControllers.delete.bind(roomsControllers))
// roomRoutes.use("/:roomId", roomsControllers.hasRoom.bind(roomsControllers))

export { roomRoutes }