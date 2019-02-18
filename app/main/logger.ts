const winston = require('winston')

interface InterfaceLoggerConfig {
  level: string,
  format: any,
  defaultMeta: object,
  transports: array
}

class Logger {
  private config: InterfaceLoggerConfig,
  private logger: any,
  constructor(config: InterfaceLoggerConfig) {
    this.config = config
  }
  public async init(): void {
    try {
      this.logger = winston.createLogger(this.config)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error)
    }
  }
  public handleMsg(message: any): void {
    this.logger.log(message)
  }
}

const logFormat = winston.format.printf((info) => {
  return `${info.timestamp}-${info.level}: ${JSON.stringify(info.message, null, 4)}\n`
})

exports.loggerInstance = new Logger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        logFormat
      )
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
})
