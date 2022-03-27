import { Router } from "express"
import roomsControllers from "../controllers/roomsController.js"

const roomRoutes = Router()

roomRoutes.post("/new", roomsControllers.new.bind(roomsControllers))

export { roomRoutes }