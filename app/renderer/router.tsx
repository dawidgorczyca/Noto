import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Root from './pages/root'
import Editor from './pages/editor'
import Start from './pages/start'
import Interface from './components/interface'

export default () => {
  return (
    <Interface>
      <HashRouter hashType='noslash'>
        <Switch>
          <Route exact path='/' component={Editor} />
        </Switch>
      </HashRouter>
    </Interface>
  )
}
