import React from 'react'
import PropTypes from 'prop-types'

import { typeturize } from 'typeturajs'

const PrimaryHeadline = props => {
  const ref = React.useRef()

  React.useEffect(() => {
    typeturize(ref.current)
  }, [ref])

  return React.createElement(props.as, {
    ref,
    className: 'primary-headline',
    children: props.children
  })
}

PrimaryHeadline.defaultProps = {
  as: 'h1'
}

PrimaryHeadline.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node
}

export default PrimaryHeadline
