import React, { Component } from 'react'
import Header from '../components/Header'
import BodyView from '../containers/BodyView'

class MainView extends Component {
  render () {
    return (
      <div className='ListView'>
        <Header />
        <BodyView />
      </div>
    )
  }
}

export default MainView
