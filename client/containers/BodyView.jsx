import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateSizes, fetchSizes, getFetchError} from '../redux/actions'
import {ErrorMessage} from '../components/ErrorMessage'
import PlotView from './PlotView'

class BodyView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      errored: false
    }
    this.setLoaded = this.setLoaded.bind(this)
    this.setErrored = this.setErrored.bind(this)
    this.updateSizes = this.updateSizes.bind(this)
  }
  setLoaded () {
    this.setState((state) => ({
      ...state,
      loaded: true,
      errored: false
    }))
  }

  setErrored (error) {
    this.setState(state => ({
      ...state,
      errored: error
    }))
  }
  updateSizes (nextPage) {
    fetchSizes(nextPage)
      .then(this.props.updateSizes)
      .catch(e => {
        this.setErrored(getFetchError(e))
      })
  }
  componentDidMount () {
    const { sizes } = this.props
    if (sizes && !sizes.data) {
      this.updateSizes()
    } else {
      this.setLoaded()
    }
  }

  render () {
    const { errored } = this.state
    if (errored) {
      return (
        <ErrorMessage message={errored} />
      )
    }
    const nextPage = this.props.sizes['next-page']
    const sizes = this.props.sizes ? this.props.sizes.data : []
    return (
      <div className='Body' >
        <h2 style={{textAlign: 'center'}}>
          { sizes ? `System: ${sizes[0].system} - Gender: ${sizes[0].gender}` : ''}
          <br />
          <button className='btn btn-blue' onClick={() => this.updateSizes(nextPage)}> Next Page </button>
          <PlotView sizes={sizes} />
        </h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => (state)

BodyView.propTypes = {
  updateSizes: PropTypes.func,
  sizes: PropTypes.objectOf(PropTypes.object).isRequired
}

export default connect(mapStateToProps, { updateSizes, fetchSizes })(BodyView)
