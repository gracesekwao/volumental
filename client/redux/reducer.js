'use strict'

const reducer = initialState => (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SIZES':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export default reducer
