import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ modifier, children }) => {
  return (
    <div className={`Message ${modifier ? `Message${modifier}` : ''}`}>
      {children}
    </div>
  )
}

Message.propTypes = {
  modifier: PropTypes.string,
  children: PropTypes.any
}

export default Message
