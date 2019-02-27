import * as React from 'react'
import { observer, inject } from 'mobx-react'
import TopLogo from '../media/top_logo.svg'
import IconClose from '../media/window_close.svg'
import IconMax from '../media/window_maximize.svg'
import IconMin from '../media/window_minimize.svg'
import Editor from '../pages/editor';
const electron = window.require('electron')


const Interface = inject('UiStore', 'EditorStore')(observer(({UiStore, EditorStore, children}) => {
  const {
    maximize,
    unmaximize,
    close,
    selectFile
  } = UiStore
  const {
    getFile,
    writeFile,
    setFilePath,
    togglePreview,
    preview
  } = EditorStore

  maximize()

  electron.ipcRenderer.on('dialog', (event, message) => {
    if (message.length) {
      getFile(message[0])
      setFilePath(message[0])
    }
  })

  return (
    <div className='interface'>
      <div className='topbar'>
        <div className='topbar-brand shadow'>
          <TopLogo />
        </div>

        <ul className='topbar-menu shadow'>
          <li onClick={() => {
            selectFile()
          }}>Open</li>
          <li onClick={() => {
            writeFile()
          }}>Save</li>
          <li className={preview ? 'active' : ''} onClick={() => {
            togglePreview()
          }}>Preview</li>
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
