import React from 'react'
import PropTypes from 'prop-types'

import { typeturize } from 'typeturajs'

const Caption = props => {
  const ref = React.useRef()

  React.useEffect(() => {
    typeturize(ref.current)
  }, [ref])

  return React.createElement(props.as, {
    ref,
    className: 'caption',
    children: props.children
  })
}

Caption.defaultProps = {
  as: 'p'
}

Caption.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node
}

export default Caption
