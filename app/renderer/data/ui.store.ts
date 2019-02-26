import { observable, reaction } from 'mobx'
import uuid from 'uuid/v1'

import EventsStore from './events.store'

class UiStore {
  @observable public width = 600
  @observable public height = 800
  @observable public maximized = false
  @observable public dir = ''

  public getDir(dirPath): void {
    const eventId = uuid()
    EventsStore.call({
      eventId,
      topic: 'service.disk.readDir',
      client: {
        id: uuid(),
        name: 'mainFrontend.UiStore'
      },
      payload: dirPath,
      response: true
    })
    reaction(
      () => EventsStore.responses[eventId].status,
      (change, reaction) => {
      if (change === true) {
        const responseObj = Object.assign({}, EventsStore.responses[eventId].payload)
        delete EventsStore.responses[eventId]
        store.dir = JSON.stringify(responseObj)
        reaction.dispose()
      }
    })
  }
  public maximize(): void {
    EventsStore.call({
      eventId: uuid(),
      topic: 'control.window.maximize',
      client: {
        id: uuid(),
        name: 'mainFrontend.UiStore'
      }
    })
  }
  public unmaximize(): void {
    EventsStore.call({
      eventId: uuid(),
      topic: 'control.window.unmaximize',
      client: {
        id: uuid(),
        name: 'mainFrontend.UiStore'
      }
    })
  }
  public close(): void {
    EventsStore.call({
      eventId: uuid(),
      topic: 'control.window.close',
      client: {
        id: uuid(),
        name: 'mainFrontend.UiStore'
      }
    })
  }
  public selectFile(): void {
    EventsStore.call({
      eventId: uuid(),
      topic: 'control.dialog.showOpenDialog',
      client: {
        id: uuid(),
        name: 'mainFrontend.UiStore'
      },
      payload: ['openFile']
    })
  }
  public selectDir(): void {
    EventsStore.call({
      eventId: uuid(),
      topic: 'control.dialog.showOpenDialog',
      client: {
        id: uuid(),
        name: 'mainFrontend.UiStore'
      },
      payload: ['openDirectory']
    })
  }
}

const store = new UiStore()

export default store
