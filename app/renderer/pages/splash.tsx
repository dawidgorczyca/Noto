/* tslint:disable:max-line-length */
import React, { useState, useEffect } from 'react'
import { Provider, observer, inject } from 'mobx-react'

import useInterval from '../hooks/useInterval.ts'
import EventsStore from '../data/events.store.ts'
import UiStore from '../data/ui.store.ts'
import EditorStore from '../data/editor.store.ts'
import Router from './../router'

const stores = {EventsStore, UiStore, EditorStore}

const Splash = () => {
  const [
    visible,
    setVisible,
  ] = useState('splash')
  const [
    switchDelay,
    setSwitchDelay
  ] = useState(3500)
  const [
    initialDelay,
    setInitialDelay
  ] = useState(500)

  useInterval(() => {
    setSwitchDelay(0)
    setVisible('app')
  }, switchDelay)

  const SplashAnimation = () => (
    <div>
      <div className='splash-border shadow'/>
      <div>
        <svg
          className='splash-logo shadow'
          x='0px' y='0px'
          width='85.104px'
          height='34.559px'
          viewBox='0 0 85.104 34.559'
          enableBackground='new 0 0 85.104 34.559'
        >
          <g>
            <path className='splash-logo-letter' fill='#D47600' d='M2.448,34.559H1.92c-1.28,0-1.92-0.639-1.92-1.92V1.968C0,0.656,0.64,0,1.92,0h0.96
              c1.056,0,1.792,0.496,2.208,1.488l7.728,17.807c0.16,0.354,0.36,0.629,0.6,0.832c0.24,0.201,0.472,0.301,0.696,0.301
              c0.288,0,0.52-0.131,0.696-0.396c0.175-0.266,0.264-0.656,0.264-1.168V1.968c0-1.312,0.64-1.968,1.92-1.968h0.528
              c1.28,0,1.92,0.656,1.92,1.968v30.671c0,1.281-0.64,1.92-1.92,1.92h-0.528c-1.056,0-1.792-0.479-2.208-1.439l-8.16-18.671
              c-0.32-0.787-0.736-1.181-1.248-1.181c-0.288,0-0.528,0.149-0.72,0.446c-0.192,0.298-0.288,0.702-0.288,1.214v17.711
              C4.368,33.92,3.728,34.559,2.448,34.559z'/>
            <path className='splash-logo-letter' fill='#D47600' d='M42.288,32.063L40.751,33.6c-0.641,0.639-1.424,0.959-2.352,0.959h-9.264c-0.928,0-1.712-0.32-2.352-0.959
              l-1.584-1.584c-0.64-0.641-0.96-1.424-0.96-2.352V4.896c0-0.928,0.32-1.728,0.96-2.399l1.536-1.536C27.375,0.32,28.159,0,29.087,0
              h9.312c0.928,0,1.711,0.336,2.352,1.008l1.536,1.536c0.64,0.641,0.96,1.424,0.96,2.352v24.769
              C43.248,30.592,42.927,31.391,42.288,32.063z M38.879,28.272V6.288c0-1.279-0.641-1.92-1.92-1.92h-6.432
              c-1.28,0-1.92,0.641-1.92,1.92v21.984c0,1.279,0.64,1.92,1.92,1.92h6.432C38.239,30.192,38.879,29.551,38.879,28.272z'/>
            <path className='splash-logo-letter' fill='#D47600' d='M47.087,0h15.168c1.28,0,1.92,0.656,1.92,1.968v0.528c0,1.248-0.64,1.872-1.92,1.872h-3.456
              c-1.28,0-1.92,0.656-1.92,1.968v26.256c0,1.312-0.641,1.967-1.92,1.967h-0.527c-1.281,0-1.921-0.654-1.921-1.967V6.336
              c0-1.312-0.64-1.968-1.92-1.968h-3.504c-1.28,0-1.92-0.624-1.92-1.872V1.968C45.167,0.656,45.807,0,47.087,0z'/>
            <path className='splash-logo-letter' fill='#D47600' d='M84.143,32.063L82.607,33.6c-0.641,0.639-1.425,0.959-2.353,0.959H70.99c-0.928,0-1.711-0.32-2.352-0.959
              l-1.584-1.584c-0.641-0.641-0.96-1.424-0.96-2.352V4.896c0-0.928,0.319-1.728,0.96-2.399l1.536-1.536C69.23,0.32,70.014,0,70.943,0
              h9.312c0.928,0,1.712,0.336,2.353,1.008l1.535,1.536c0.641,0.641,0.961,1.424,0.961,2.352v24.769
              C85.104,30.592,84.783,31.391,84.143,32.063z M80.734,28.272V6.288c0-1.279-0.641-1.92-1.92-1.92h-6.432
              c-1.28,0-1.92,0.641-1.92,1.92v21.984c0,1.279,0.64,1.92,1.92,1.92h6.432C80.094,30.192,80.734,29.551,80.734,28.272z'/>
          </g>
        </svg>
      </div>
    </div >
  )

  return (
    <Provider {...stores}>
      <div className='splash'>
        {visible === 'app' ? <Router/> : <SplashAnimation/>}
      </div>
    </Provider>
  )
}

export default Splash
