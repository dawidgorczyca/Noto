import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Splash from './pages/splash'

import './styles/main.scss'

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
}

render(Splash)
