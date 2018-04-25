import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className || 'Image'} />
}

Image.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}

export default Image
