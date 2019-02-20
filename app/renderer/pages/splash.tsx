import * as React from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v1'

class Splash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: ''
    }
  }
  public render() {
    return(
      <div className='splashScreen'>
        <h1>Splash</h1>
      </div>
    )
  }
}

export default Splash
