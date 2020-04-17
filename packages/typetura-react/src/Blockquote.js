import React from 'react'
import PropTypes from 'prop-types'

import { typeturize } from 'typeturajs'

const Blockquote = props => {
  const ref = React.useRef()

  React.useEffect(() => {
    typeturize(ref.current)
  }, [ref])

  return React.createElement(props.as, {
    ref,
    className: 'blockquote',
    children: props.children
  })
}

Blockquote.defaultProps = {
  as: 'blockquote'
}

Blockquote.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node
}

export default Blockquote
