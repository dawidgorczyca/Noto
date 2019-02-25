import * as React from 'react'
import { observer, inject } from 'mobx-react'
import TopLogo from '../media/top_logo.svg'
import IconClose from '../media/window_close.svg'
import IconMax from '../media/window_maximize.svg'
import IconMin from '../media/window_minimize.svg'

const Interface = inject('UiStore')(observer(({UiStore, children}) => {
  const {
    maximize,
    unmaximize,
    close,
    selectFile
  } = UiStore

  maximize()

  const selectFolder = () => {
    const selectedDirectory = remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (selectedDirectory && selectedDirectory[0]) {
      console.log(selectedDirectory[0])
    }
  }

  return (
    <div className='interface'>
      <div className='topbar'>
        <div className='topbar-brand shadow'>
          <TopLogo />
        </div>

        <ul className='topbar-menu shadow'>
          <li onClick={() => selectFile()}>Open</li>
          <li>Save</li>
          <li>Preview</li>
        </ul>

        <div className='window-control shadow'>
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
