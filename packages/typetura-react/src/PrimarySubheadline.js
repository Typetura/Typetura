import React from 'react'
import PropTypes from 'prop-types'

import { typeturize } from 'typeturajs'

const PrimarySubheadline = props => {
  const ref = React.useRef()

  React.useEffect(() => {
    typeturize(ref.current)
  }, [ref])

  return React.createElement(props.as, {
    ref,
    className: 'primary-subheadline',
    children: props.children
  })
}

PrimarySubheadline.defaultProps = {
  as: 'h2'
}

PrimarySubheadline.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node
}

export default PrimarySubheadline
