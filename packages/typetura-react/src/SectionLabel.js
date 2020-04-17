import React from 'react'
import PropTypes from 'prop-types'

import { typeturize } from 'typeturajs'

const SectionLabel = props => {
  const ref = React.useRef()

  React.useEffect(() => {
    typeturize(ref.current)
  }, [ref])

  return React.createElement(props.as, {
    ref,
    className: 'section-label',
    children: props.children
  })
}

SectionLabel.defaultProps = {
  as: 'h2'
}

SectionLabel.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node
}

export default SectionLabel
