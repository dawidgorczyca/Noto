interface InterfaceMessage {
  eventId: string,
  topic: string,
  client: {
    name: string,
    id: string
  }
  payload: any
}

class RendererHandler {
  private windowInstance: any,
  private event: InterfaceEvent

  constructor(window: any, event: InterfaceMessage) {
    this.windowInstance = window
    this.event = event
  }
  public async call(): void {
    await this.windowInstance[this.getMethod()](this.event.payload)
  }
  public async get(): any {
    try {
      const results = await this.windowInstance[this.getMethod()](this.event.payload)
      return results
    } catch(error) {
      return error
    }
  }
  private getMethod(): string {
    return this.event.topic.split('.')[2]
  }
}

module.exports = RendererHandler
