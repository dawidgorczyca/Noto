const ws = require('ws')
const portCheck = require('detect-port')
const os = require('os')
const diskEvents = require('./disk.events')

interface InterfaceWebsocketServerConfig {
  port: number,
  [propName: string]: any
}

interface InterfaceMessage {
  eventId: string,
  topic: string,
  client: {
    name: string,
    id: string
  }
  payload: any
}

const serviceTypes = {
  library: 'library',
  process: 'process'
}

class Events {
  private config: InterfaceWebsocketServerConfig,
  private server: any,
  private services: any,
  private eventsList: any,
  private dataPath: any

  constructor(config: InterfaceWebsocketServerConfig, services: any) {
    this.config = config
    this.services = services
    this.dataPath = os.tmpdir()
  }
  public async init(): void {
    try {
      await this.initWsServer()
      this.prepareServicesList()
    } catch (error) {
      process.send({
        topic: 'control.log'
        level: 'error',
        message: error
      })
    }
  }
  public shutdown(): void {
    this.server.close()
  }
  private async initWsServer(): void {
    const portValidation: boolean = await this.checkPort(this.config.port)
    if (portValidation) {
      this.server = new ws.Server(this.config)
      this.handleClient()
    } else {
      process.send({
        topic: 'control.log',
        level: 'error',
        message: 'Websocket Server Error - Defined Port is in use'
      })
    }
  }
  private prepareServicesList(): void {
    const servicesEventsList = {}
    const names = Object.keys(this.services)
    names.forEach((name, index) => {
      const service = this.services[name]
      if (service.type === serviceTypes.library) {
        servicesEventsList[name] = Object.keys(this.services[name].target)
      }
    })
    this.eventsList = servicesEventsList
  }
  private handleClient(): void {
    this.server.on('connection', (connection: any) => {
      connection.send(JSON.stringify({
        topic: 'events list',
        payload: this.eventsList
      }))
      connection.send(JSON.stringify({
        topic: 'dataPath',
        payload: this.dataPath
      }))
      connection.on('message', (message) => this.handleMessage(message, connection))
    })
  }
  private async handleService(topic: string, payload: any) {
    const topicQuery = topic.split('.')
    const action = topicQuery[0]
    const service = this.services[topicQuery[1]]
    let output
    if (action === 'service') {
      output = await service.target[topicQuery[2]](payload)
    }
    return output
  }
  private validateMessage(message: InterfaceMessage) {
    let output = true
    const {
      topic,
      client
    } = message
    if (!topic) {
      output = false
    }
    if (!client || !client.id || !client.name) {
      output = false
    }
    return output
  }
  private getEventActionGroup(topic: string) {
    return topic.split('.')[0]
  }
  private async handleMessage(message: InterfaceMessage, connection: any): void {
    const parsedMessage = JSON.parse(message)
    const {
      eventId,
      topic,
      client,
      payload
    } = parsedMessage
    const validation = this.validateMessage(parsedMessage)
    if (validation) {
      process.send({
        topic: 'control.log',
        level: 'info',
        message: `Event - (${client.id})${client.name} - ${topic} - ${payload}`,
      })

      const actionGroup = this.getEventActionGroup(parsedMessage.topic)

      switch (actionGroup) {
        case 'service':
          const output = await this.handleService(topic, payload)
          connection.send(JSON.stringify({
            ...parsedMessage,
            topic: `RESPONSE - ${topic}`,
            payload: output
          }))
          break
        case 'control':
          process.send(parsedMessage)
          break
        default:
          break
      }
   }
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
},
{
  disk: {
    type: serviceTypes.library,
    target: diskEvents
  }
})

eventBridge.init()
process.on( 'SIGTERM', () => eventBridge.shutdown())
