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
          console.log('store.filePath',store.filePath)
          store.getFile()
        }
        reaction.dispose()
      }
    })
  }
  public getFile(): void {
    console.log('getfile', store.filePath)
    const eventId = uuid()
    EventsStore.call({
      eventId,
      topic: 'service.disk.readFile',
      client: {
        id: uuid(),
        name: 'mainFrontend.UiStore'
      },
      payload: this.filePath,
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
          console.log(store.rawData)
        }
        reaction.dispose()
      }
    })
  }
}

const store = new EditorStore()

export default store
