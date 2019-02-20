import * as React from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v1'
import { observer, inject } from 'mobx-react'

@inject('UiStore') @observer
class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '',
      inputValue: ''
    }
  }
  public handleChange(event) {
    this.setState({inputValue: event.target.value})
  }
  public getDir() {
    this.props.UiStore.getDir(this.state.inputValue)
  }
  public render() {
    const { UiStore } = this.props
    const { maximize, unmaximize } = UiStore
    return(
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <h3><Link to='/start' id='start'>Start</Link></h3>
        <p>{UiStore.dir}</p>
        <input type='text' value={this.state.inputValue} onChange={(event) => this.handleChange(event)}/>
        <button onClick={() => this.getDir()}>Send</button>
        <br/><br/>
        <button onClick={() => maximize()}>Maximize</button>
        <button onClick={() => unmaximize()}>Minimze</button>
      </div>
    )
  }
}

export default Root
