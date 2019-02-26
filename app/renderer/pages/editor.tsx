import React from 'react'
import { observer, inject } from 'mobx-react'

const Editor = inject('EditorStore')(observer(({EditorStore}) => {
  return (
    <div className='editor'>
      <textarea
        className='editor-input shadow-lesser'
        autoFocus={true}
        onChange={(event) => EditorStore.setRawData(event.target.value)}
        value={EditorStore.rawData}
      />
      <div className='editor-bar' />
    </div>
  )
}))

export default Editor
