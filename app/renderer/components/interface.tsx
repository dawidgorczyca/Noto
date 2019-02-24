import * as React from 'react'
import { observer, inject } from 'mobx-react'
import TopLogo from '../media/top_logo.svg'
import IconClose from '../media/window_close.svg'
import IconMax from '../media/window_maximize.svg'
import IconMin from '../media/window_minimize.svg'

const Interface = inject('UiStore')(observer(({UiStore, children}) => {
  const { maximize, unmaximize, close } = UiStore

  maximize()

  return (
    <div className='interface'>
      <div className='topbar'>
        <div className='topbar-brand shadow'>
          <TopLogo />
        </div>

        <div className='window-control'>
          <button
            className='window-btn window-minimize'
            onClick={() => unmaximize()}
          ><IconMin/></button>
          <button
            className='window-btn window-maximize'
            onClick={() => maximize()}
          ><IconMax/></button>
          <button
            className='window-btn window-close'
            onClick={() => close()}
          ><IconClose/></button>
        </div>
      </div>
      <div className='interface-content shadow'>
        {children}
      </div>
    </div>
  )
}))

export default Interface
