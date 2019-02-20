import EventsStore from './events.store'
import UiStore from './ui.store'

class RootStore {
    public ui: UiStore
    public events: EventsStore

    constructor() {
        this.events = new EventsStore(this)
        this.ui = new UiStore(this)
    }
}

export default RootStore
