import { observable, reaction } from 'mobx'
import uuid from 'uuid/v1'

import EventsStore from './events.store'

class EditorStore {
  @observable public rawData: ''
  @observable public filePath: ''

  constructor() {
    this.rawData = ''
    this.filePath = ''
    this.initStore()
  }

  public initStore(): void {
    this.getFilePath()
  }
  public setRawData(data): void {
    this.rawData = data
  }
  public getFilePath(): void {
    const eventId = uuid()
    EventsStore.call({
      eventId,
      topic: 'service.disk.readFile',
      client: {
        id: uuid(),
        name: 'mainFrontend.UiStore'
      },
      payload: `${EventsStore.dataPath}\\noto_lastFile.json`,
      response: true
    })
    reaction(
      () => EventsStore.responses[eventId].status,
      (change, reaction) => {
      if (change === true) {
        const responseObj = Object.assign({}, EventsStore.responses[eventId].payload)
        delete EventsStore.responses[eventId]
        // Below should not stay on frontend side
        if (responseObj.data.length) {
          let bufferOriginal = Buffer.from(responseObj.data)
          store.filePath = JSON.parse(bufferOriginal.toString('utf8')).results[0]
          store.getFile(store.filePath)
        }
        reaction.dispose()
      }
    })
  }
  public getFile(filePath: string): void {
    const path = filePath && filePath.length ? filePath : this.filePath
    const eventId = uuid()
    EventsStore.call({
      eventId,
      topic: 'service.disk.readFile',
      client: {
        id: uuid(),
        name: 'mainFrontend.UiStore'
      },
      payload: path,
      response: true
    })
    reaction(
      () => EventsStore.responses[eventId].status,
      (change, reaction) => {
      if (change === true) {
        const responseObj = Object.assign({}, EventsStore.responses[eventId].payload)
        delete EventsStore.responses[eventId]
        // Below should not stay on frontend side
        if (responseObj.data.length) {
          let bufferOriginal = Buffer.from(responseObj.data)
          store.rawData = bufferOriginal.toString('utf8')
        }
        reaction.dispose()
      }
    })
  }
}

const store = new EditorStore()

export default store
