import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducer from './reducer'

const initialState = {
  sizes: {}
}

const store = createStore(
  reducer(initialState),
  initialState,
  composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store
