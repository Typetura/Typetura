import React from 'react'
import PropTypes from 'prop-types'

import { typeturize } from 'typeturajs'

const Meta = props => {
  const ref = React.useRef()

  React.useEffect(() => {
    typeturize(ref.current)
  }, [ref])

  return React.createElement(props.as, {
    ref,
    className: 'meta',
    children: props.children
  })
}

Meta.defaultProps = {
  as: 'h3'
}

Meta.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node
}

export default Meta
