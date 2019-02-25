import { observable } from 'mobx'
class EditorStore {
  @observable public rawData: ''
  constructor() {
    this.rawData = ''
  }
  public setRawData(data): void {
    this.rawData = data
  }
}

const store = new EditorStore()

export default store
