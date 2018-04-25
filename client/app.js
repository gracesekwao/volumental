import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import store from './redux/store'

import 'style/index.scss'

import MainView from './main/MainView'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={MainView} />
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#app')
)
