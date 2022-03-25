import { config } from "dotenv"
import { server } from "./app.js"
import { logger } from "./utils/logger.js"

config()

const PORT = process.env.PORT || 3000


server.listen(PORT, () => logger.info("Server Running on port " + PORT) )