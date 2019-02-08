import * as React from 'react'
import { Link } from 'react-router-dom'

const {remote, ipcRenderer} = window.require('electron')

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: ''
    }
  }
  public componentDidMount() {
    ipcRenderer.on('ping', (event, arg) => {
      // tslint:disable-next-line:no-console
      this.setState({status: arg.counter})
    })
  }
  public render() {
    return(
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <h3><Link to='/start' id='start'>Start</Link></h3>
        <p>{this.state.status}</p>
      </div>
    )
  }
}

export default Root
