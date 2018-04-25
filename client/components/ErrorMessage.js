import React from 'react'
import PropTypes from 'prop-types'

import Message from './Message'

const ErrorMessage = ({ message }) => {
  return (
    <Message modifier='Error'>
      {`${message}. If the error persists please contact us`}
    </Message>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default ErrorMessage
