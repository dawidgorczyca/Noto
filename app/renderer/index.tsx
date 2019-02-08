import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Router from './router'

const {remote, ipcRenderer} = window.require('electron')

ipcRenderer.on('ping', (event, arg) => {
  // tslint:disable-next-line:no-console
  console.log(event, arg)
})

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
}

render(Router)
