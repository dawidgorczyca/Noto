import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'

import EventsStore from './data/events.store.ts'
import UiStore from './data/ui.store.ts'
import Root from './pages/root'
import Start from './pages/start'

const stores = {EventsStore, UiStore}

export default () => {
  return (
    <Provider {...stores}>
      <HashRouter hashType='noslash'>
        <Switch>
          <Route exact path='/' component={Root} />
          <Route exact path='/start' component={Start} />
          <Route component={() => <h1>204 No Content</h1>} />
        </Switch>
      </HashRouter>
    </Provider>
  )
}
