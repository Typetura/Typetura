import React from 'react';
import PropTypes from 'prop-types';

import { typeturize } from 'typeturajs';

const Pullquote = (props) => {
  const ref = React.useRef();

  React.useEffect(() => {
    typeturize(ref.current);
  }, [ref]);

  return React.createElement(props.as, {
    ref,
    className: 'pullquote',
    children: props.children,
  });
};

Pullquote.defaultProps = {
  as: 'p',
};

Pullquote.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
};

export default Pullquote;
