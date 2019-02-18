import * as React from 'react'
import { Link } from 'react-router-dom'

const {remote, ipcRenderer} = window.require('electron')

let ws = null

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
  public connectWs() {
    ws = new WebSocket('ws://localhost:8643')
    ws.onopen = (event) => {
      ws.send('dupa')
    }
    ws.onmessage = (event) => {
      this.setState({status: event.data})
    }
  }
  public sendMsg() {
    ws.send(this.state.inputValue)
  }
  public componentDidMount() {
    this.connectWs()
  }
  public render() {
    return(
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <h3><Link to='/start' id='start'>Start</Link></h3>
        <p>{this.state.status}</p>
        <input type="text" value={this.state.inputValue} onChange={(event) => this.handleChange(event)}/>
        <button onClick={() => this.sendMsg()}>Send</button>
      </div>
    )
  }
}

export default Root
