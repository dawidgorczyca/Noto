import React from 'react'
import { observer, inject } from 'mobx-react'
import Markdown from 'markdown-to-jsx'

const Editor = inject('EditorStore')(observer(({EditorStore}) => {
  return (
    <div className='editor'>
      {!EditorStore.preview ? (
        <textarea
          className='editor-input shadow-lesser'
          autoFocus={true}
          onChange={(event) => EditorStore.setRawData(event.target.value)}
          value={EditorStore.rawData}
        />
      ) : (
        <Markdown className='editor-preview shadow'>{EditorStore.rawData}</Markdown>
      )}
      <div className='editor-bar'>
        {EditorStore.fileName && (<span className='editor-filename'>{EditorStore.fileName}</span>)}
        {EditorStore.charsCount != -1 && (<span className='editor-count'>CHARACTERS: {EditorStore.charsCount}</span>)}
        {EditorStore.wordsCount != -1 && (<span className='editor-count'>WORDS: {EditorStore.wordsCount}</span>)}
      </div>
    </div>
  )
}))

export default Editor
