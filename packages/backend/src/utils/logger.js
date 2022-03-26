import pino from "pino"

export const logger = pino({
  enabled: !process.env.DISABLE_LOG,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    }
  }
})