
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BarStack } from '@vx/shape'
import { AxisBottom } from '@vx/axis'
import { LinearGradient } from '@vx/gradient'
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale'
import { Tooltip } from '@vx/tooltip'
import { LegendOrdinal } from '@vx/legend'

const Styles = {
  TopView: { position: 'relative' },
  LegendOrdinal: {
    width: '100%', display: 'flex', position: 'absolute', top: (40 / 2 - 10), justifyContent: 'center', fontSize: '14px'
  },
  Tooltip: {
    minWidth: 60, backgroundColor: 'rgba(0,0,0,0.9)', color: 'white'
  },
  AxisBottom: { fill: '#a44afe', fontSize: 11, textAnchor: 'middle' },
  ColumnColors: ['#6c5efb', '#c998ff', '#a44afe', '#673AB7', '#536DFE', '#2979FF', '#2196F3']
}

const getPossibleFieldKeys = (data) => {
  var keys = []
  Object.values(data).forEach((obj) => {
    keys = [...keys, ...Object.keys(obj)]
  })
  return keys.sort()
}

const getDataObjectFromRawData = (data, keys) => {
  return Object.keys(data).reduce((obj, key) => {
    const otherKeys = keys.reduce((o, k) => {
      o[k] = data[key][k] || 0
      return o
    }, {})
    obj.push({ key, ...otherKeys })
    return obj
  }, [])
}

const getKeysFromDataObject = (dataObject) => {
  return dataObject.reduce((keys, objRow) => {
    return [
      ...keys,
      ...new Set((Object.keys(objRow).filter(d => d !== 'key')))
    ]
  }, [])
}

export default class PlotView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showTooltip: false,
      tooltip: {},
      selectedColum: {},
      settings: {
        width: 1200, height: 800, events: true, margin: { top: 40 }
      }
    }
    this.showTooltip = this.showTooltip.bind(this)
    this.hideTooltip = this.hideTooltip.bind(this)
  }
  showTooltip (tooltip) {
    this.setState({
      tooltip, showTooltip: true
    })
  }
  hideTooltip () {
    this.setState({ showTooltip: false })
  }
  getX ({ key }) {
    return Number(key)
  }
  render () {
    const { width, height, events, margin } = this.state.settings

    const xMax = width
    const yMax = height - margin.top - 100

    const data = this.props.sizes ? this.props.sizes[0].sizes : []
    const fieldKeys = getPossibleFieldKeys(data)
    const dataObject = getDataObjectFromRawData(data, fieldKeys)
    const keys = getKeysFromDataObject(dataObject)
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: dataObject.map(this.getX),
      padding: 0.2,
      tickFormat: () => val => val
    })

    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      nice: true,
      domain: [0, yMax]
    })

    const zScale = scaleOrdinal({
      domain: keys,
      range: Styles.ColumnColors
    })

    let tooltipTimeout
    return (
      <div style={Styles.TopView}>
        <svg width={width} height={height} style={{marginTop: 50}}>
          <LinearGradient id='boxplot' to='#ffffff' from='#f8f8f8' />
          <rect x={0} y={0} width={width} height={height} fill={`url(#boxplot)`} rx={14} />
          <BarStack
            top={(margin.top)} data={dataObject} keys={keys} height={(yMax + 100)}
            x={this.getX} xScale={xScale} zScale={zScale} yScale={yScale}
            onClick={(data) => (event) => {
              if (!events) return
              this.setState({
                selectedColum: data.data
              })
            }}
            onMouseLeave={(data) => (event) => {
              tooltipTimeout = setTimeout(() => {
                this.hideTooltip()
              }, 300)
            }}
            onMouseMove={(data) => (event) => {
              if (tooltipTimeout) clearTimeout(tooltipTimeout)
              const top = (event.clientY - margin.top - data.height)
              const left = xScale(data.x) + data.width + data.paddingInner * data.step / 2
              this.showTooltip({ data, top, left })
            }}
          />
          <AxisBottom
            scale={xScale} top={(yMax + margin.top + 10)}
            stroke='#a44afe' tickStroke='#a44afe'
            tickLabelProps={
              (value, index) => (Styles.AxisBottom)
            }
          />
        </svg>
        <div style={Styles.LegendOrdinal}>
          <LegendOrdinal scale={zScale} direction='row' labelMargin='0 15px 0 0' />
        </div>
        {
          (this.state.showTooltip && this.state.tooltip.data) &&
          <Tooltip top={this.state.tooltip.top} left={this.state.tooltip.left} style={Styles.Tooltip}>
            <div style={{ color: zScale(this.state.tooltip.data.key) }}>
              <strong>
                Size: {this.state.tooltip.data.key}
              </strong>
            </div>
            <div>
                Value: {this.state.tooltip.data.data[this.state.tooltip.data.key]}
            </div>
          </Tooltip>
        }
        {
          this.state.selectedColum &&
          <div>
            <hr />
            {
              Object.keys(this.state.selectedColum).map(k => (
                <span>
                  {`${k === 'key' ? 'size' : k} : ${this.state.selectedColum[k]} , `}
                </span>
              ))
            }
          </div>
        }
      </div>
    )
  }
}
PlotView.propTypes = {
  sizes: PropTypes.objectOf(PropTypes.object).isRequired
}
