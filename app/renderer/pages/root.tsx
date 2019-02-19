import * as React from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v1'

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
      ws.send(JSON.stringify({
        eventId: uuid(),
        topic: 'service.disk.readDir',
        client: {
          id: uuid(),
          name: 'mainFrontend'
        }
        payload: 'C:/Projects/noto'
      }))
    }
    ws.onmessage = (event) => {
      const parsedEvent = JSON.parse(event.data)
      if (parsedEvent.topic !== 'events list') {
        this.setState({status: JSON.parse(event.data).payload})
      }
    }
  }
  public sendMsg() {
    ws.send(JSON.stringify({
        eventId: uuid(),
        topic: 'Testing',
        client: {
          id: uuid(),
          name: 'mainFrontend'
        }
        payload: this.state.inputValue
      }))
  }
  public componentDidMount() {
    this.connectWs()
  }
  public render() {
    return(
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <h3><Link to='/start' id='start'>Start</Link></h3>
        <p>{this.state.status}</p>
        <input type='text' value={this.state.inputValue} onChange={(event) => this.handleChange(event)}/>
        <button onClick={() => this.sendMsg()}>Send</button>
      </div>
    )
  }
}

export default Root
