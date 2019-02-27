import { observable, reaction } from 'mobx'
import uuid from 'uuid/v1'

import EventsStore from './events.store'

class EditorStore {
  @observable public rawData: ''
  @observable public filePath: ''
  @observable public fileName: ''
  @observable public wordsCount: number
  @observable public charsCount: number
  @observable public preview: boolean
  @observable public previewData: any

  constructor() {
    this.rawData = ''
    this.filePath = ''
    this.fileName = ''
    this.wordsCount = -1
    this.charsCount = -1
    this.initStore()
    this.preview = false
    this.previewData = ''
  }
  public setFilePath(path): void {
    store.filePath = path
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
          if (path.length) {
            store.fileName = path.split('\\').reverse()[0]
          }
          const text = bufferOriginal.toString('utf8')
          store.setRawData(text)
        }
        reaction.dispose()
      }
    })
  }
  public writeFile(): void {
    const eventId = uuid()
    EventsStore.call({
      eventId,
      topic: 'service.disk.writeFile',
      client: {
        id: uuid(),
        name: 'mainFrontend.UiStore'
      },
      payload: {
        path: store.filePath,
        data: store.rawData
      },
      response: false
    })
  }
  public setRawData(data): void {
    this.rawData = data
    this.charsCount = data.length
    this.wordsCount = data.split(' ').length
  }
  public togglePreview(): void {
    store.preview = !store.preview
  }
  private initStore(): void {
    this.getFilePath()
  }
}

const store = new EditorStore()

export default store
