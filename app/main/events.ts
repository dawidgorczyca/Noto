const ws = require('ws')
const portCheck = require('detect-port')

interface InterfaceWebsocketServerConfig {
  port: number,
  [propName: string]: any
}

class Events {
  private config: InterfaceWebsocketServerConfig,
  private server: any,
  constructor(config: InterfaceWebsocketServerConfig) {
    this.config = config
  }
  public async init(): void {
    try {
      const portValidation: boolean = await this.checkPort(this.config.port)
      if (portValidation) {
        this.server = new ws.Server(this.config)
        this.handleClient()
      } else {
        process.send({
          level: 'error',
          message: 'Websocket Server Error - Defined Port is in use'
        })
      }
    } catch (error) {
      process.send({
        level: 'error',
        message: error
      })
    }
  }
  private handleClient(): void {
    this.server.on('connection', (connection: any) => {
      connection.on('message', (message) => this.handleMessage(message, connection))
    })
  }
  private handleMessage(message: object, connection: any): void {
    process.send({
      level: 'info',
      message: `Recieved message - ${message}`,
    })
    connection.send(`message processed: ${message}`)
  }
  private async checkPort(portNumber: number): boolean {
    const check = await portCheck(portNumber)
    if (portNumber === check) {
      return true
    } else {
      return false
    }
  }
}

const eventBridge = new Events({
  port: 8643,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024
  }
})

eventBridge.init()
