import { observable } from 'mobx'

interface InterfaceEvent {
  eventId: string,
  topic: string,
  client: {
    name: string,
    id: string
  }
  payload?: any,
  response?: boolean
}

class EventsStore {
  @observable public servicesEvents = {}
  @observable public responses: {}
  @observable public dataPath: ''
  private client: any

  constructor() {
    if (!EventsStore.instance) {
      EventsStore.instance = this
    }
    this.initClient()
    return EventsStore.instance
  }
  public initClient(): void {
    this.responses = {}
    this.client = new WebSocket('ws://localhost:8643')
    this.client.onmessage = (event) => {
      const parsedEvent = JSON.parse(event.data)
      if (parsedEvent.topic === 'events list') {
        this.servicesEvents = parsedEvent.payload
      }
      if (parsedEvent.topic === 'dataPath') {
        this.dataPath = parsedEvent.payload
      }
      this.handleResponse(parsedEvent)
    }
  }
  public call(event: InterfaceEvent): void {
    if (this.client.readyState === 1) {
      this.client.send(JSON.stringify(event))
    }
    if (event.response) {
      const id = event.eventId
      this.responses = Object.assign({}, {
        ...this.responses,
        [id]: {
          status: false
        }
      })
    }
  }
  private handleResponse(event: InterfaceEvent): void {
    const { eventId, payload } = event
    if (this.responses[eventId]) {
      this.responses[eventId].payload = payload
      this.responses[eventId].status =  true
    }
  }
}

const store = new EventsStore()
Object.freeze(store)

export default store
