import * as React from 'react'
import { observer, inject } from 'mobx-react'
import TopLogo from '../media/top_logo.svg'

const Interface = inject('UiStore')(observer(({UiStore, children}) => {
  const { maximize, unmaximize, close } = UiStore

  maximize()

  return (
    <div className='interface'>
      <div className='topbar'>
        <TopLogo />
        <button onClick={() => maximize()}>Maximize</button>
        <button onClick={() => unmaximize()}>Minimze</button>
        <button onClick={() => close()}>close</button>
      </div>
      {children}
    </div>
  )
}))

export default Interface
