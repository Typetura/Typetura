import React from 'react'
import PropTypes from 'prop-types'

import { typeturize } from 'typeturajs'

const Big = props => {
  const ref = React.useRef()

  React.useEffect(() => {
    typeturize(ref.current)
  }, [ref])

  return React.createElement(props.as, {
    ref,
    className: 'big',
    children: props.children
  })
}

Big.defaultProps = {
  as: 'p'
}

Big.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node
}

export default Big
